import { get, writable, type Writable } from "svelte/store";
import { VISIBLE } from "./stores";

interface Notification {
  id: string;
  title: string;
  body: string;
  timeout?: number;
  app?: string;
  icon?: string;
}

type NotificationInput = Omit<Notification, "id" | "timeout"> & {
  timeout?: number;
};

const DEFAULT_TIMEOUT = 3000;

export const notifications: Writable<Notification[]> = writable([]);

let shouldHideAfterLastNotification = false;

function generateId(): string {
  return Date.now().toString();
}

function showNotificationPanel(): void {
  if (get(VISIBLE) === "hidden") {
    VISIBLE.set("half-visible");
    shouldHideAfterLastNotification = true;
  }
}

function hideNotificationPanel(): void {
  if (shouldHideAfterLastNotification && get(notifications).length === 0) {
    if (get(VISIBLE) === "half-visible") {
      VISIBLE.set("hidden");
    }
    shouldHideAfterLastNotification = false;
  }
}

export function sendNotification(data: NotificationInput): void {
  showNotificationPanel();

  const newNotification: Notification = {
    ...data,
    id: generateId(),
    timeout: data.timeout || DEFAULT_TIMEOUT,
  };

  notifications.update((currentNotifications) => [
    ...currentNotifications,
    newNotification,
  ]);

  setTimeout(() => {
    removeNotification(newNotification.id);
    hideNotificationPanel();
  }, newNotification.timeout);
}

export function removeNotification(id: string): void {
  notifications.update((currentNotifications) =>
    currentNotifications.filter((notification) => notification.id !== id),
  );
}
