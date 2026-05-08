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
  error: string | null;
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

export interface CallParticipant {
  name: string;
  number: string;
  avatar?: string;
}

export interface CallSession {
  participant: CallParticipant;
  direction: "incoming" | "outgoing";
  startedAt: string;
}

export interface CallsState {
  status: CallStatus;
  currentCall: CallSession | null;
}

export interface CallsDomain extends CallsState {
  receiveIncomingCall(participant: CallParticipant): void;
  startOutgoingCall(participant: CallParticipant): void;
  answerCall(): void;
  declineCall(): void;
  endCall(): void;
}

export interface PhoneShell extends DeviceState, PhoneSessionState {
  readonly apps: AppDefinition[];
  readonly activeApp: AppDefinition | null;
  readonly activeAppComponent: AppDefinition["component"] | null;
  openApp(appId: string): void;
  closeApp(): void;
  reset(): void;
  hide(): Promise<void>;
  show(): void;
  lock(): void;
  unlock(): void;
  setSetupState(phoneId: number, setupClouds: PhoneCloudAccount[]): void;
  setShellState(shell: PhoneShellResponse): void;
  setPhoneData(phoneData?: PhoneDataResponse | null): PhoneDataResponse | null;
  resetData(): void;
  openPhone(payload: OpenPhonePayload): Promise<void>;
}
