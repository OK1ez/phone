import { SendEvent } from "$lib/utils/eventsHandlers";
import { notifications } from "./notifications.svelte";

import type {
  AttemptCallRequest,
  AttemptCallResponse,
  CallEndReason,
  CallMessage,
  CallParticipant,
  CallSession,
  CallStatus,
} from "./types";

const FAILED_CALL_REASON_LABELS: Partial<Record<CallEndReason, string>> = {
  busy: "Line busy",
  self: "Cannot call yourself",
  timeout: "No answer",
  unavailable: "Number unavailable",
};

export class CallsManager {
  status = $state<CallStatus>("idle");
  currentCall = $state<CallSession | null>(null);
  callerNumber = $state<string | null>(null);
  private pendingRequestId: number | null = null;
  private nextRequestId = 1;

  private createRequestId(): number {
    return this.nextRequestId++;
  }

  private showEndedNotice(reason: CallEndReason): void {
    const body = FAILED_CALL_REASON_LABELS[reason];
    if (!body) {
      return;
    }

    notifications.enqueue({
      appId: "phone",
      title: "Phone",
      body,
    });
  }

  receiveIncomingCall(callId: number, participant: CallParticipant): void {
    this.currentCall = {
      state: "incoming",
      callId,
      participant,
      direction: "incoming",
      startedAt: new Date().toISOString(),
    };
    this.status = "incoming";
    notifications.resetCallDisplay();
  }

  async startOutgoingCall(participant: CallParticipant): Promise<void> {
    if (this.status !== "idle" || this.pendingRequestId !== null) {
      this.showEndedNotice("busy");
      return;
    }

    if (!this.callerNumber) {
      this.showEndedNotice("unavailable");
      return;
    }

    const requestId = this.createRequestId();
    this.pendingRequestId = requestId;

    const response = await SendEvent<AttemptCallResponse, AttemptCallRequest>("attemptCall", {
      transmitterNumber: this.callerNumber,
      receiverNumber: participant.number,
    });

    if (this.pendingRequestId !== requestId) {
      return;
    }

    this.pendingRequestId = null;

    if (!response?.ok) {
      this.showEndedNotice(response?.reason ?? "unavailable");
      return;
    }

    this.currentCall = {
      state: "ringing",
      callId: response.callId,
      participant,
      direction: "outgoing",
      startedAt: new Date().toISOString(),
    };
    this.status = "outgoing";
    notifications.resetCallDisplay();
  }

  async answerCall(): Promise<void> {
    if (!this.currentCall || this.currentCall.state !== "incoming") {
      return;
    }

    const accepted = await SendEvent<boolean, number>("acceptCall", this.currentCall.callId);
    if (!accepted) {
      this.reset();
      return;
    }
  }

  async declineCall(): Promise<void> {
    if (!this.currentCall || this.currentCall.state !== "incoming") {
      return;
    }

    await SendEvent<boolean, number>("declineCall", this.currentCall.callId);
    this.reset();
  }

  async endCall(): Promise<void> {
    if (this.currentCall && "callId" in this.currentCall) {
      await SendEvent<boolean, number>("endCall", this.currentCall.callId);
    }

    this.reset();
  }

  acceptActiveCall(callId: number): void {
    if (!this.currentCall || !("callId" in this.currentCall) || this.currentCall.callId !== callId) {
      return;
    }

    this.currentCall = {
      ...this.currentCall,
      state: "active",
      startedAt: new Date().toISOString(),
    };
    this.status = "active";
  }

  handleCallMessage(message: CallMessage): void {
    if (message.action === "incoming") {
      if (this.status !== "idle") {
        return;
      }

      this.receiveIncomingCall(message.callId, message.participant);
      return;
    }

    if (!this.currentCall || !("callId" in this.currentCall) || this.currentCall.callId !== message.callId) {
      return;
    }

    if (message.action === "accepted") {
      this.acceptActiveCall(message.callId);
      return;
    }

    this.reset();
    this.showEndedNotice(message.reason);
  }

  reset(): void {
    this.pendingRequestId = null;
    this.status = "idle";
    this.currentCall = null;
  }

  setCallerNumber(callerNumber: string | null): void {
    this.callerNumber = callerNumber;
  }
}

export const calls = new CallsManager();
