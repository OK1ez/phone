import { appRegistry } from "$apps/registry";
import { bleeterApp } from "$apps/bleeter/state/bleeter-app.svelte";
import { galleryApp } from "$apps/gallery/state/gallery-app.svelte";
import { mailApp } from "$apps/mail/state/mail-app.svelte";
import { messagesApp } from "$apps/messages/state/messages-app.svelte";
import { phoneApp } from "$apps/phone/state/phone-app.svelte";
import { settingsApp } from "$apps/settings/state/settings-app.svelte";
import { SendEvent } from "$lib/utils/eventsHandlers";
import type { SharedImageAsset } from "$lib/types/media";
import { notifications } from "./notifications.svelte";
import { normalizePhoneSettings } from "./settings";

import type { AppDefinition } from "$apps/types";
import type {
  CallParticipant,
  CallSession,
  DeviceSettings,
  OpenPhonePayload,
  PhoneCloudAccount,
  PhoneDataResponse,
  PhoneShellResponse,
  PhoneOpenState,
  PhoneSettings,
} from "./types";

const appsById = Object.fromEntries(appRegistry.map((app) => [app.id, app])) as Record<string, AppDefinition>;

const appStates = {
  bleeter: bleeterApp,
  gallery: galleryApp,
  mail: mailApp,
  messages: messagesApp,
  phone: phoneApp,
  settings: settingsApp,
};

type ResettableAppId = keyof typeof appStates;
type GetShellResponse = PhoneShellResponse | false;
type FetchOwnedCloudsResponse = PhoneCloudAccount[] | false;
type UpdatePhoneSettingsResponse = PhoneSettings | false;
type AttemptCallResponse = unknown;

function resetApp(appId: string | null) {
  if (!appId) {
    return;
  }

  const appState = appStates[appId as ResettableAppId];
  appState?.reset?.();
}

function normalizePhoneData(phoneData: PhoneDataResponse): PhoneDataResponse {
  return {
    ...phoneData,
    settings: normalizePhoneSettings(phoneData.settings, appRegistry),
  };
}

let visible = $state(false);
let isLocked = $state(false);
let activeAppId = $state<string | null>(null);
let showHomescreen = $state(true);

let activePhoneId = $state<number | null>(null);
let activeCloudId = $state<number | null>(null);
let openState = $state<PhoneOpenState | null>(null);
let setupClouds = $state.raw<PhoneCloudAccount[]>([]);
let data = $state.raw<PhoneDataResponse | null>(null);
let error = $state<string | null>(null);

let telephonyStatus = $state<"idle" | "incoming" | "outgoing" | "active">("idle");
let currentCall = $state<CallSession | null>(null);

let activeImage = $state<SharedImageAsset | null>(null);

let activeApp = $derived(activeAppId ? (appsById[activeAppId] ?? null) : null);
let activeAppComponent = $derived(activeApp?.component ?? null);

let homescreenTimer: ReturnType<typeof setTimeout> | undefined;
let callConnectTimer: ReturnType<typeof setTimeout> | undefined;

function syncHomescreen(appOpenDelay = 250) {
  if (homescreenTimer) {
    clearTimeout(homescreenTimer);
    homescreenTimer = undefined;
  }

  if (!activeAppId) {
    showHomescreen = true;
    return;
  }

  showHomescreen = true;
  homescreenTimer = setTimeout(() => {
    showHomescreen = false;
  }, appOpenDelay);
}

function clearCallConnectTimer() {
  if (callConnectTimer) {
    clearTimeout(callConnectTimer);
    callConnectTimer = undefined;
  }
}

function resetCall() {
  clearCallConnectTimer();
  telephonyStatus = "idle";
  currentCall = null;
}

function createCall(participant: CallParticipant, direction: CallSession["direction"]): CallSession {
  return {
    participant,
    direction,
    startedAt: new Date().toISOString(),
  };
}

function hasActivePhoneSession(phoneId: number, cloudId: number | null | undefined) {
  return activePhoneId === phoneId && activeCloudId === (cloudId ?? null) && (data !== null || openState !== null);
}

function resetSessionState() {
  phone.device.reset();
  phone.data.reset();
  resetCall();
  activeImage = null;
}

function getCurrentSettings() {
  return data ? normalizePhoneSettings(data.settings, appRegistry) : null;
}

function replaceSettings(nextSettings: PhoneSettings) {
  if (!data) {
    return;
  }

  data = {
    ...data,
    settings: normalizePhoneSettings(nextSettings, appRegistry),
  };
}

async function persistSettings(nextSettings: PhoneSettings, previousSettings: PhoneSettings | null) {
  if (!data) {
    return false;
  }

  const savedSettings = await SendEvent<UpdatePhoneSettingsResponse, { cloudId: number; settings: PhoneSettings }>(
    "updateSettings",
    {
      cloudId: data.cloudId,
      settings: nextSettings,
    },
  );

  if (!savedSettings) {
    if (previousSettings) {
      replaceSettings(previousSettings);
    }

    return false;
  }

  replaceSettings(savedSettings);
  return true;
}

async function updatePhoneSettings(nextSettings: PhoneSettings) {
  const previousSettings = getCurrentSettings();
  const normalizedSettings = normalizePhoneSettings(nextSettings, appRegistry);

  replaceSettings(normalizedSettings);
  return persistSettings(normalizedSettings, previousSettings);
}

function applySetupState(phoneId: number, clouds: PhoneCloudAccount[]) {
  activePhoneId = phoneId;
  activeCloudId = null;
  error = null;
  data = null;
  openState = "setup";
  setupClouds = clouds;
  isLocked = false;
}

function applyPhoneShell(shell: PhoneShellResponse) {
  error = null;

  if (shell.state === "unlocked") {
    if (!shell.data) {
      data = null;
      error = "Missing phone data";
      return;
    }

    activeCloudId = shell.data.cloudId;
    data = normalizePhoneData(shell.data);
    openState = null;
    setupClouds = [];
    isLocked = false;
    return;
  }

  data = null;
  activeCloudId = shell.cloudId ?? activeCloudId;
  openState = shell.state;
  setupClouds = [];
  isLocked = true;
}

export const phone = {
  apps: appRegistry,

  device: {
    get visible() {
      return visible;
    },
    get isLocked() {
      return isLocked;
    },
    get activeAppId() {
      return activeAppId;
    },
    get showHomescreen() {
      return showHomescreen;
    },
    openApp(appId: string) {
      activeAppId = appId;
      syncHomescreen();
    },
    closeApp() {
      resetApp(activeAppId);
      activeAppId = null;
      syncHomescreen();
    },
    reset() {
      resetApp(activeAppId);
      activeAppId = null;
      isLocked = false;
      syncHomescreen();
    },
    hide() {
      visible = false;
    },
    show() {
      visible = true;
    },
    lock() {
      isLocked = true;
    },
    unlock() {
      isLocked = false;
    },
  },

  data: {
    get activePhoneId() {
      return activePhoneId;
    },
    get activeCloudId() {
      return activeCloudId;
    },
    get openState() {
      return openState;
    },
    get setupClouds() {
      return setupClouds;
    },
    get data() {
      return data;
    },
    get error() {
      return error;
    },
    setSetupState(phoneId: number, setupClouds: PhoneCloudAccount[]) {
      applySetupState(phoneId, setupClouds);
    },
    setShellState(shell: PhoneShellResponse) {
      applyPhoneShell(shell);
    },
    setPhoneData(phoneData?: PhoneDataResponse | null) {
      if (!phoneData && data) {
        return data;
      }

      error = null;

      if (!phoneData) {
        data = null;
        error = "Missing phone data";
        return null;
      }

      activeCloudId = phoneData.cloudId;
      data = normalizePhoneData(phoneData);
      openState = null;
      setupClouds = [];
      isLocked = false;
      return data;
    },
    reset() {
      activePhoneId = null;
      activeCloudId = null;
      openState = null;
      setupClouds = [];
      data = null;
      error = null;
    },
  },

  settings: {
    get value() {
      return getCurrentSettings();
    },
    get device() {
      return getCurrentSettings()?.device ?? null;
    },
    get notifications() {
      return getCurrentSettings()?.notifications ?? null;
    },
    get appearance() {
      return getCurrentSettings()?.appearance ?? null;
    },
    async update(nextSettings: PhoneSettings) {
      return updatePhoneSettings(nextSettings);
    },
    async setDeviceSetting<TKey extends keyof DeviceSettings>(key: TKey, value: DeviceSettings[TKey]) {
      const currentSettings = getCurrentSettings();
      if (!currentSettings) {
        return false;
      }

      return updatePhoneSettings({
        ...currentSettings,
        device: {
          ...currentSettings.device,
          [key]: value,
        },
      });
    },
    async setNotificationsMuted(value: boolean) {
      const currentSettings = getCurrentSettings();
      if (!currentSettings) {
        return false;
      }

      return updatePhoneSettings({
        ...currentSettings,
        notifications: {
          ...currentSettings.notifications,
          muted: value,
        },
      });
    },
    async setNotificationAppEnabled(appId: string, enabled: boolean) {
      const currentSettings = getCurrentSettings();
      if (!currentSettings) {
        return false;
      }

      return updatePhoneSettings({
        ...currentSettings,
        notifications: {
          ...currentSettings.notifications,
          preferences: {
            ...currentSettings.notifications.preferences,
            [appId]: {
              ...(currentSettings.notifications.preferences[appId] ?? { enabled: true }),
              enabled,
            },
          },
        },
      });
    },
  },

  telephony: {
    get status() {
      return telephonyStatus;
    },
    get currentCall() {
      return currentCall;
    },
    receiveIncomingCall(participant: CallParticipant) {
      clearCallConnectTimer();
      currentCall = createCall(participant, "incoming");
      telephonyStatus = "incoming";
      notifications.showCall();
    },
    startOutgoingCall(participant: CallParticipant) {
      clearCallConnectTimer();
      currentCall = createCall(participant, "outgoing");
      telephonyStatus = "outgoing";
      notifications.showCall();
      void SendEvent<AttemptCallResponse, string>("attemptCall", participant.number);

      callConnectTimer = setTimeout(() => {
        if (telephonyStatus === "outgoing" && currentCall) {
          telephonyStatus = "active";
          currentCall.startedAt = new Date().toISOString();
        }
      }, 1200);
    },
    answerCall() {
      if (!currentCall || telephonyStatus !== "incoming") {
        return;
      }

      telephonyStatus = "active";
      currentCall.startedAt = new Date().toISOString();
    },
    declineCall() {
      resetCall();
    },
    endCall() {
      resetCall();
    },
  },

  mediaViewer: {
    get activeImage() {
      return activeImage;
    },
    openImage(image: SharedImageAsset) {
      activeImage = image;
    },
    closeImage() {
      activeImage = null;
    },
  },

  get activeApp() {
    return activeApp;
  },
  get activeAppComponent() {
    return activeAppComponent;
  },
  openApp(appId: string) {
    if (!appsById[appId]) {
      return;
    }

    activeAppId = appId;
    syncHomescreen();
  },
  closeApp() {
    this.device.closeApp();
  },
  async openPhone(payload: OpenPhonePayload) {
    const { phoneId, cloudId } = payload;

    if (hasActivePhoneSession(phoneId, cloudId)) {
      visible = true;
      isLocked = openState === "locked";
      return;
    }

    if (activePhoneId !== phoneId || activeCloudId !== (cloudId ?? null)) {
      resetSessionState();
    }

    activePhoneId = phoneId;

    if (!cloudId) {
      const ownedClouds = await SendEvent<FetchOwnedCloudsResponse>("fetchOwnedClouds");
      applySetupState(phoneId, ownedClouds || []);
      visible = true;
      return;
    }

    activeCloudId = cloudId;

    const shell = await SendEvent<GetShellResponse, number>("getShell", cloudId);
    if (!shell) {
      return;
    }

    applyPhoneShell(shell);
    visible = true;
  },
  async hide() {
    if (!visible) {
      return;
    }

    await SendEvent<boolean>("closePhone");
    visible = false;
  },
  lock() {
    isLocked = true;
  },
  unlock() {
    isLocked = false;
  },
};
