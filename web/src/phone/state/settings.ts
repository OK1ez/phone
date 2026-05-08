import type { AppDefinition } from "$apps/types";
import type { NotificationPreference, PhoneSettings } from "./types";

function createDefaultNotificationPreferences(apps: AppDefinition[]): Record<string, NotificationPreference> {
  return Object.fromEntries(apps.map((app) => [app.id, { enabled: true } satisfies NotificationPreference]));
}

export function createDefaultPhoneSettings(apps: AppDefinition[]): PhoneSettings {
  return {
    device: {
      airplaneMode: false,
      streamerMode: false,
    },
    notifications: {
      muted: false,
      preferences: createDefaultNotificationPreferences(apps),
    },
    appearance: {
      wallpaperId: null,
    },
  };
}

export function normalizePhoneSettings(raw: unknown, apps: AppDefinition[]): PhoneSettings {
  const defaults = createDefaultPhoneSettings(apps);
  const source = raw && typeof raw === "object" ? (raw as Partial<PhoneSettings>) : {};

  return {
    device: {
      airplaneMode: source.device?.airplaneMode ?? defaults.device.airplaneMode,
      streamerMode: source.device?.streamerMode ?? defaults.device.streamerMode,
    },
    notifications: {
      muted: source.notifications?.muted ?? defaults.notifications.muted,
      preferences: {
        ...defaults.notifications.preferences,
        ...source.notifications?.preferences,
      },
    },
    appearance: {
      wallpaperId: source.appearance?.wallpaperId ?? defaults.appearance.wallpaperId,
    },
  };
}
