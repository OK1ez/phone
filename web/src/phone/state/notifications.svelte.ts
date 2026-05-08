import type { PhoneNotification } from "./types";
import { settings } from "./settings.svelte";

const AUTO_DISMISS_MS = 4000;

export class NotificationsManager {
  // State
  items = $state<PhoneNotification[]>([]);
  compactCall = $state(false);
  timers = new Map<string, ReturnType<typeof setTimeout>>();

  // Derived values
  muted = $derived(settings.notifications?.muted ?? false);
  preferences = $derived(settings.notifications?.preferences ?? {});

  private isAppEnabled(appId: string): boolean {
    return this.preferences[appId]?.enabled ?? true;
  }

  private createNotification(notification: Omit<PhoneNotification, "id" | "timestamp">): PhoneNotification {
    return {
      ...notification,
      id: `${notification.appId}-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
  }

  private startDismissTimer(notificationId: string): void {
    this.timers.set(
      notificationId,
      setTimeout(() => {
        this.timers.delete(notificationId);
        this.remove(notificationId);
      }, AUTO_DISMISS_MS),
    );
  }

  private stopDismissTimer(notificationId: string): void {
    const timer = this.timers.get(notificationId);
    if (!timer) {
      return;
    }

    clearTimeout(timer);
    this.timers.delete(notificationId);
  }

  private remove(notificationId: string): void {
    this.items = this.items.filter((notification) => notification.id !== notificationId);
  }

  toggleCompactCall(): void {
    this.compactCall = !this.compactCall;
  }

  resetCallDisplay(): void {
    this.compactCall = false;
  }

  enqueue(notification: Omit<PhoneNotification, "id" | "timestamp">): void {
    if (this.muted || !this.isAppEnabled(notification.appId)) {
      return;
    }

    const queuedNotification = this.createNotification(notification);

    this.items = [queuedNotification, ...this.items];
    this.startDismissTimer(queuedNotification.id);
  }

  dismiss(notificationId: string): void {
    this.stopDismissTimer(notificationId);
    this.remove(notificationId);
  }

  async setMuted(value: boolean): Promise<boolean> {
    return settings.setNotificationsMuted(value);
  }

  async setAppEnabled(appId: string, enabled: boolean): Promise<boolean> {
    return settings.setNotificationAppEnabled(appId, enabled);
  }

  reset(): void {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }

    this.timers.clear();
    this.items = [];
    this.compactCall = false;
  }
}

export const notifications = new NotificationsManager();
