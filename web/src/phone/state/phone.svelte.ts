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

  private resetSession(): void {
    this.resetApps();
    this.activeAppId = null;
    this.isLocked = false;
    this.syncHomescreen();

    this.phoneId = null;
    this.cloudId = null;
    this.name = null;
    this.phoneNumber = null;
    this.owner = null;
    this.openState = null;
    this.setupClouds = [];

    settings.reset();
    calls.reset();
    mediaViewer.reset();
  }

  private applySetupState(nextPhoneId: number, clouds: PhoneCloudAccount[]): void {
    this.phoneId = nextPhoneId;
    this.cloudId = null;
    this.name = null;
    this.phoneNumber = null;
    this.owner = null;
    this.openState = "setup";
    this.setupClouds = clouds;
    this.isLocked = false;

    settings.reset();
  }

  private applyLockedState(nextPhoneId: number, nextCloudId: number): void {
    this.phoneId = nextPhoneId;
    this.cloudId = nextCloudId;
    this.name = null;
    this.phoneNumber = null;
    this.owner = null;
    this.openState = "locked";
    this.setupClouds = [];
    this.isLocked = true;

    settings.reset();
  }

  applyPhoneData(phoneData: PhoneDataResponse): PhoneDataResponse {
    this.cloudId = phoneData.cloudId;
    this.name = phoneData.name ?? null;
    this.phoneNumber = phoneData.phoneNumber ?? null;
    this.owner = phoneData.owner ?? null;
    this.openState = null;
    this.setupClouds = [];
    this.isLocked = false;

    settings.setSettings(normalizePhoneSettings(phoneData.settings, appRegistry));

    return phoneData;
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

  async openPhone(payload: OpenPhonePayload): Promise<void> {
    const nextPhoneId = payload.phoneId;
    const nextCloudId = payload.cloudId ?? null;

    if (this.phoneId === nextPhoneId && this.cloudId === nextCloudId) {
      this.visible = true;
      this.isLocked = this.openState === "locked";
      return;
    }

    this.resetSession();
    this.phoneId = nextPhoneId;

    if (nextCloudId === null) {
      const ownedClouds = await SendEvent<FetchOwnedCloudsResponse>("fetchOwnedClouds");

      this.applySetupState(nextPhoneId, ownedClouds || []);
      this.visible = true;
      return;
    }

    this.cloudId = nextCloudId;

    const shell = await SendEvent<GetShellResponse, number>("getShell", nextCloudId);
    if (!shell) return;

    if (shell.state === "unlocked" && shell.data) {
      this.applyPhoneData(shell.data);
    } else {
      this.applyLockedState(nextPhoneId, shell.cloudId ?? nextCloudId);
    }

    this.visible = true;
  }

  async hide(): Promise<void> {
    if (!this.visible) return;

    await SendEvent<boolean>("closePhone");
    this.visible = false;
  }
}

export const phone = new PhoneManager();
