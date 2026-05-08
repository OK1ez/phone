import type { AppDefinition } from "$apps/types";
import type { SharedImageAsset } from "$lib/types/media";

export interface DeviceState {
  visible: boolean;
  isLocked: boolean;
  activeAppId: string | null;
  showHomescreen: boolean;
}

export interface DeviceDomain extends DeviceState {
  openApp(appId: string): void;
  closeApp(): void;
  reset(): void;
  hide(): void;
  show(): void;
  lock(): void;
  unlock(): void;
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

export interface PhoneDataState {
  activePhoneId: number | null;
  activeCloudId: number | null;
  openState: PhoneOpenState | null;
  setupClouds: PhoneCloudAccount[];
  data: PhoneDataResponse | null;
  isLoading: boolean;
  error: string | null;
}

export interface PhoneDataDomain extends PhoneDataState {
  setSetupState(phoneId: number, setupClouds: PhoneCloudAccount[]): void;
  setShellState(shell: PhoneShellResponse): void;
  setPhoneData(phoneData?: PhoneDataResponse | null): PhoneDataResponse | null;
  reset(): void;
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

export interface SettingsDomain {
  value: PhoneSettings | null;
  device: DeviceSettings | null;
  notifications: NotificationSettings | null;
  appearance: AppearanceSettings | null;
  update(nextSettings: PhoneSettings): Promise<boolean>;
  setDeviceSetting<TKey extends keyof DeviceSettings>(key: TKey, value: DeviceSettings[TKey]): Promise<boolean>;
  setNotificationsMuted(value: boolean): Promise<boolean>;
  setNotificationAppEnabled(appId: string, enabled: boolean): Promise<boolean>;
}

export type TelephonyStatus = "idle" | "incoming" | "outgoing" | "active";

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

export interface TelephonyState {
  status: TelephonyStatus;
  currentCall: CallSession | null;
}

export interface TelephonyDomain extends TelephonyState {
  receiveIncomingCall(participant: CallParticipant): void;
  startOutgoingCall(participant: CallParticipant): void;
  answerCall(): void;
  declineCall(): void;
  endCall(): void;
}

export interface MediaViewerState {
  activeImage: SharedImageAsset | null;
}

export interface MediaViewerDomain extends MediaViewerState {
  openImage(image: SharedImageAsset): void;
  closeImage(): void;
}

export interface PhoneShell {
  readonly apps: AppDefinition[];
  readonly activeApp: AppDefinition | null;
  readonly activeAppComponent: AppDefinition["component"] | null;
  readonly device: DeviceDomain;
  readonly data: PhoneDataDomain;
  readonly settings: SettingsDomain;
  readonly telephony: TelephonyDomain;
  readonly mediaViewer: MediaViewerDomain;
  openApp(appId: string): void;
  closeApp(): void;
  openPhone(payload: OpenPhonePayload): Promise<void>;
  hide(): Promise<void>;
  lock(): void;
  unlock(): void;
}
