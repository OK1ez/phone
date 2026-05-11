import { appRegistry } from "$apps/registry";
import { bleeterApp } from "$apps/bleeter/state/bleeter-app.svelte";
import { cameraApp } from "$apps/camera/state/camera-app.svelte";
import { galleryApp } from "$apps/gallery/state/gallery-app.svelte";
import { mailApp } from "$apps/mail/state/mail-app.svelte";
import { messagesApp } from "$apps/messages/state/messages-app.svelte";
import { phoneApp } from "$apps/phone/state/phone-app.svelte";
import { settingsApp } from "$apps/settings/state/settings-app.svelte";
import { SendEvent } from "$lib/utils/eventsHandlers";
import { calls } from "./calls.svelte";
import { mediaViewer } from "./media-viewer.svelte";
import { settings } from "./settings.svelte";
import { normalizePhoneSettings } from "./settings";

import type { AppDefinition } from "$apps/types";
import type {
  OpenPhonePayload,
  PhoneCloudAccount,
  PhoneDataResponse,
  PhoneShell,
  PhoneShellResponse,
  PhoneOpenState,
} from "./types";

const appsById = Object.fromEntries(appRegistry.map((app) => [app.id, app])) as Record<string, AppDefinition>;

const appStates = {
  bleeter: bleeterApp,
  camera: cameraApp,
  gallery: galleryApp,
  mail: mailApp,
  messages: messagesApp,
  phone: phoneApp,
  settings: settingsApp,
};

type ResettableAppId = keyof typeof appStates;
type GetShellResponse = PhoneShellResponse | false;
type FetchOwnedCloudsResponse = PhoneCloudAccount[] | false;

export class PhoneManager implements PhoneShell {
  readonly apps = appRegistry;

  visible = $state(false);
  isLocked = $state(false);
  activeAppId = $state<string | null>(null);
  showHomescreen = $state(true);

  phoneId = $state<number | null>(null);
  cloudId = $state<number | null>(null);
  name = $state<string | null>(null);
  phoneNumber = $state<number | null>(null);
  owner = $state<number | null>(null);
  openState = $state<PhoneOpenState | null>(null);
  setupClouds = $state.raw<PhoneCloudAccount[]>([]);
  error = $state<string | null>(null);

  activeApp = $derived(this.activeAppId ? (appsById[this.activeAppId] ?? null) : null);
  activeAppComponent = $derived(this.activeApp?.component ?? null);

  private homescreenTimer: ReturnType<typeof setTimeout> | undefined;

  private resetApps(): void {
    for (const appId of Object.keys(appStates) as ResettableAppId[]) {
      appStates[appId]?.reset?.();
    }
  }

  private syncHomescreen(appOpenDelay = 250): void {
    if (this.homescreenTimer) {
      clearTimeout(this.homescreenTimer);
      this.homescreenTimer = undefined;
    }

    if (!this.activeAppId) {
      this.showHomescreen = true;
      return;
    }

    this.showHomescreen = true;
    this.homescreenTimer = setTimeout(() => {
      this.showHomescreen = false;
    }, appOpenDelay);
  }

  private resetDeviceState(): void {
    this.resetApps();
    this.activeAppId = null;
    this.isLocked = false;
    this.syncHomescreen();
  }

  private resetDataState(): void {
    this.phoneId = null;
    this.cloudId = null;
    this.name = null;
    this.phoneNumber = null;
    this.owner = null;
    this.openState = null;
    this.setupClouds = [];
    this.error = null;
    settings.reset();
  }

  private hasActivePhoneSession(nextPhoneId: number, nextCloudId: number | null | undefined): boolean {
    return (
      this.phoneId === nextPhoneId &&
      this.cloudId === (nextCloudId ?? null) &&
      (this.cloudId !== null || this.openState !== null)
    );
  }

  private resetSessionState(): void {
    this.resetDeviceState();
    this.resetDataState();
    calls.reset();
    mediaViewer.reset();
  }

  private applySetupState(nextPhoneId: number, clouds: PhoneCloudAccount[]): void {
    this.phoneId = nextPhoneId;
    this.cloudId = null;
    this.name = null;
    this.phoneNumber = null;
    this.owner = null;
    this.error = null;
    this.openState = "setup";
    this.setupClouds = clouds;
    this.isLocked = false;
    settings.reset();
  }

  private applyPhoneData(phoneData: PhoneDataResponse): void {
    this.cloudId = phoneData.cloudId;
    this.name = phoneData.name ?? null;
    this.phoneNumber = phoneData.phoneNumber ?? null;
    this.owner = phoneData.owner ?? null;
    settings.setSettings(normalizePhoneSettings(phoneData.settings, appRegistry));
    this.openState = null;
    this.setupClouds = [];
    this.isLocked = false;
  }

  private applyPhoneShell(shell: PhoneShellResponse): void {
    this.error = null;

    if (shell.state === "unlocked") {
      if (!shell.data) {
        this.name = null;
        this.phoneNumber = null;
        this.owner = null;
        this.error = "Missing phone data";
        settings.reset();
        return;
      }

      this.applyPhoneData(shell.data);
      return;
    }

    this.name = null;
    this.phoneNumber = null;
    this.owner = null;
    this.cloudId = shell.cloudId ?? this.cloudId;
    this.openState = shell.state;
    this.setupClouds = [];
    this.isLocked = true;
    settings.reset();
  }

  openApp(appId: string): void {
    if (!appsById[appId]) {
      return;
    }

    this.activeAppId = appId;
    this.syncHomescreen();
  }

  closeApp(): void {
    this.activeAppId = null;
    this.syncHomescreen();
  }

  reset(): void {
    this.resetDeviceState();
  }

  show(): void {
    this.visible = true;
  }

  setSetupState(nextPhoneId: number, nextSetupClouds: PhoneCloudAccount[]): void {
    this.applySetupState(nextPhoneId, nextSetupClouds);
  }

  setShellState(shell: PhoneShellResponse): void {
    this.applyPhoneShell(shell);
  }

  setPhoneData(phoneData?: PhoneDataResponse | null): PhoneDataResponse | null {
    this.error = null;

    if (!phoneData) {
      this.name = null;
      this.phoneNumber = null;
      this.owner = null;
      this.error = "Missing phone data";
      settings.reset();
      return null;
    }

    this.applyPhoneData(phoneData);
    return phoneData;
  }

  resetData(): void {
    this.resetDataState();
  }

  async openPhone(payload: OpenPhonePayload): Promise<void> {
    const { phoneId: nextPhoneId, cloudId: nextCloudId } = payload;

    if (this.hasActivePhoneSession(nextPhoneId, nextCloudId)) {
      this.visible = true;
      this.isLocked = this.openState === "locked";
      return;
    }

    if (this.phoneId !== nextPhoneId || this.cloudId !== (nextCloudId ?? null)) {
      this.resetSessionState();
    }

    this.phoneId = nextPhoneId;

    if (!nextCloudId) {
      const ownedClouds = await SendEvent<FetchOwnedCloudsResponse>("fetchOwnedClouds");
      this.applySetupState(nextPhoneId, ownedClouds || []);
      this.visible = true;
      return;
    }

    this.cloudId = nextCloudId;

    const shell = await SendEvent<GetShellResponse, number>("getShell", nextCloudId);
    if (!shell) {
      return;
    }

    this.applyPhoneShell(shell);
    this.visible = true;
  }

  async hide(): Promise<void> {
    if (!this.visible) {
      return;
    }

    await SendEvent<boolean>("closePhone");
    this.visible = false;
  }

  lock(): void {
    this.isLocked = true;
  }

  unlock(): void {
    this.isLocked = false;
  }
}

export const phone = new PhoneManager();
