import type { AppDefinition } from "$apps/types";

export interface DeviceState {
  visible: boolean;
  isLocked: boolean;
  activeAppId: string | null;
  showHomescreen: boolean;
}

export interface PhoneDataResponse {
  cloudId: number;
  name?: string;
  phoneNumber?: number;
  owner?: number;
  settings: PhoneSettings;
}

export type PhoneOpenState = "locked" | "setup";

export interface OpenPhonePayload {
  phoneId: number;
  cloudId?: number | null;
}

export interface PhoneShellResponse {
  state: "locked" | "unlocked";
  cloudId?: number;
  data?: PhoneDataResponse | null;
}

export type SetupMode = "create" | "existing";

export interface PhoneCloudAccount {
  cloudId: number;
  name: string;
  phoneNumber: number;
}

export interface PhoneSessionState {
  phoneId: number | null;
  cloudId: number | null;
  name: string | null;
  phoneNumber: number | null;
  owner: number | null;
  openState: PhoneOpenState | null;
  setupClouds: PhoneCloudAccount[];
}

export interface NotificationPreference {
  enabled: boolean;
}

export interface DeviceSettings {
  airplaneMode: boolean;
  streamerMode: boolean;
}

export interface NotificationSettings {
  muted: boolean;
  preferences: Record<string, NotificationPreference>;
}

export interface AppearanceSettings {
  wallpaperId: string | null;
}

export interface PhoneSettings {
  device: DeviceSettings;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
}

export interface PhoneNotification {
  id: string;
  appId: string;
  title: string;
  body: string;
  timestamp: string;
}

export type CallStatus = "idle" | "incoming" | "outgoing" | "active";
export type CallEndReason = "busy" | "declined" | "ended" | "self" | "timeout" | "unavailable" | "disconnected";

export interface CallParticipant {
  name: string;
  number: string;
  avatar?: string;
}

interface BaseCallSession {
  participant: CallParticipant;
  startedAt: string;
}

export type CallSession =
  | (BaseCallSession & { state: "ringing"; direction: "outgoing"; callId: number })
  | (BaseCallSession & { state: "incoming"; direction: "incoming"; callId: number })
  | (BaseCallSession & { state: "active"; direction: "incoming" | "outgoing"; callId: number });

export interface AttemptCallRequest {
  transmitterNumber: string;
  receiverNumber: string;
}

export type AttemptCallResponse =
  | { ok: true; callId: number; status: "ringing" }
  | { ok: false; reason: CallEndReason };

export type CallMessage =
  | { action: "incoming"; callId: number; participant: CallParticipant }
  | { action: "accepted"; callId: number }
  | { action: "ended"; callId: number; reason: CallEndReason };

export interface CallsState {
  status: CallStatus;
  currentCall: CallSession | null;
}

export interface CallsDomain extends CallsState {
  receiveIncomingCall(callId: number, participant: CallParticipant): void;
  startOutgoingCall(participant: CallParticipant): Promise<void>;
  answerCall(): Promise<void>;
  declineCall(): Promise<void>;
  endCall(): Promise<void>;
  setCallerNumber(callerNumber: string | null): void;
}

export interface PhoneShell extends DeviceState, PhoneSessionState {
  readonly apps: AppDefinition[];
  readonly activeApp: AppDefinition | null;
  readonly activeAppComponent: AppDefinition["component"] | null;
  openApp(appId: string): void;
  closeApp(): void;
  hide(): Promise<void>;
  applyPhoneData(phoneData: PhoneDataResponse): PhoneDataResponse;
  openPhone(payload: OpenPhonePayload): Promise<void>;
}
