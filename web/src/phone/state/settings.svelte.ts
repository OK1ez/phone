import { appRegistry } from "$apps/registry";
import { SendEvent } from "$lib/utils/eventsHandlers";

import { phone } from "./phone.svelte";
import { normalizePhoneSettings } from "./settings";

import type { DeviceSettings, NotificationSettings, PhoneSettings } from "./types";

type UpdatePhoneSettingsResponse = PhoneSettings | false;

export class SettingsManager {
  // State
  value = $state.raw<PhoneSettings | null>(null);

  // Derived values
  device = $derived(this.value?.device ?? null);
  notifications = $derived(this.value?.notifications ?? null);
  appearance = $derived(this.value?.appearance ?? null);

  private replace(nextSettings: PhoneSettings): void {
    this.value = normalizePhoneSettings(nextSettings, appRegistry);
  }

  private async persist(nextSettings: PhoneSettings, previousSettings: PhoneSettings | null): Promise<boolean> {
    const cloudId = phone.cloudId;
    if (!cloudId) {
      return false;
    }

    const savedSettings = await SendEvent<UpdatePhoneSettingsResponse, { cloudId: number; settings: PhoneSettings }>(
      "updateSettings",
      {
        cloudId,
        settings: nextSettings,
      },
    );

    if (!savedSettings) {
      if (previousSettings) {
        this.replace(previousSettings);
      }

      return false;
    }

    this.replace(savedSettings);
    return true;
  }

  setSettings(nextSettings: PhoneSettings): void {
    this.replace(nextSettings);
  }

  reset(): void {
    this.value = null;
  }

  async update(nextSettings: PhoneSettings): Promise<boolean> {
    const previousSettings = this.value;
    const normalizedSettings = normalizePhoneSettings(nextSettings, appRegistry);

    this.replace(normalizedSettings);
    return this.persist(normalizedSettings, previousSettings);
  }

  async setDeviceSetting<TKey extends keyof DeviceSettings>(
    key: TKey,
    value: DeviceSettings[TKey],
  ): Promise<boolean> {
    if (!this.value) {
      return false;
    }

    return this.update({
      ...this.value,
      device: {
        ...this.value.device,
        [key]: value,
      },
    });
  }

  async setNotificationsMuted(value: boolean): Promise<boolean> {
    if (!this.value) {
      return false;
    }

    return this.setNotificationSettings({
      ...this.value.notifications,
      muted: value,
    });
  }

  async setNotificationAppEnabled(appId: string, enabled: boolean): Promise<boolean> {
    if (!this.value) {
      return false;
    }

    return this.setNotificationSettings({
      ...this.value.notifications,
      preferences: {
        ...this.value.notifications.preferences,
        [appId]: {
          ...(this.value.notifications.preferences[appId] ?? { enabled: true }),
          enabled,
        },
      },
    });
  }

  async setNotificationSettings(nextSettings: NotificationSettings): Promise<boolean> {
    if (!this.value) {
      return false;
    }

    return this.update({
      ...this.value,
      notifications: nextSettings,
    });
  }
}

export const settings = new SettingsManager();
