import { writable } from "svelte/store";

interface Notification {
  id: string;
  title: string;
  body: string;
  timeout?: number;
  app?: string;
  icon?: string;
}

export const NOTIFICATIONS = writable<Notification[]>([]);

export const sendNotification = (notification: Omit<Notification, 'id'>) => {
  const id = Date.now().toString();
  const newNotification: Notification = {
    ...notification,
    id,
    timeout: notification.timeout || 3000
  };

  NOTIFICATIONS.update(n => [...n, newNotification]);

  setTimeout(() => {
    NOTIFICATIONS.update(n => n.filter(item => item.id !== id));
  }, newNotification.timeout);
};
