import { SendEvent } from "$lib/utils/eventsHandlers";
import { notifications } from "./notifications.svelte";

import type { CallParticipant, CallSession, CallStatus } from "./types";

type AttemptCallResponse = unknown;

export class CallsManager {
  status = $state<CallStatus>("idle");
  currentCall = $state<CallSession | null>(null);

  private connectTimer: ReturnType<typeof setTimeout> | undefined;

  private clearConnectTimer(): void {
    if (!this.connectTimer) {
      return;
    }

    clearTimeout(this.connectTimer);
    this.connectTimer = undefined;
  }

  private createCall(participant: CallParticipant, direction: CallSession["direction"]): CallSession {
    return {
      participant,
      direction,
      startedAt: new Date().toISOString(),
    };
  }

  receiveIncomingCall(participant: CallParticipant): void {
    this.clearConnectTimer();
    this.currentCall = this.createCall(participant, "incoming");
    this.status = "incoming";
    notifications.resetCallDisplay();
  }

  startOutgoingCall(participant: CallParticipant): void {
    this.clearConnectTimer();
    this.currentCall = this.createCall(participant, "outgoing");
    this.status = "outgoing";
    notifications.resetCallDisplay();
    void SendEvent<AttemptCallResponse, string>("attemptCall", participant.number);

    this.connectTimer = setTimeout(() => {
      if (this.status === "outgoing" && this.currentCall) {
        this.status = "active";
        this.currentCall.startedAt = new Date().toISOString();
      }
    }, 1200);
  }

  answerCall(): void {
    if (!this.currentCall || this.status !== "incoming") {
      return;
    }

    this.status = "active";
    this.currentCall.startedAt = new Date().toISOString();
  }

  declineCall(): void {
    this.reset();
  }

  endCall(): void {
    this.reset();
  }

  reset(): void {
    this.clearConnectTimer();
    this.status = "idle";
    this.currentCall = null;
  }
}

export const calls = new CallsManager();
