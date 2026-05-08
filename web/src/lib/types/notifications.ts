export interface NotificationPayload {
  app?: string;
  title?: string;
  content?: string;
}

export interface PhoneNotificationPayload {
  appId: string;
  title: string;
  body: string;
}
