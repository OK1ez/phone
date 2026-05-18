import { createAppRouter } from "$apps/shared/create-app-router.svelte";

import Home from "../pages/home/home.svelte";
import NotificationsApplications from "../pages/notifications/notifications-applications.svelte";
import Notifications from "../pages/notifications/notifications.svelte";

const settingsRoutes = {
  settings: {
    label: "Settings",
    component: Home,
  },
  notifications: {
    label: "Notifications",
    component: Notifications,
  },
  notifications_applications: {
    label: "Applications",
    component: NotificationsApplications,
  },
} as const;

export class SettingsAppManager {
  readonly router = createAppRouter({
    routes: settingsRoutes,
    initialRoute: "settings",
  });

  reset(): void {
    this.router.reset();
  }
}

export const settingsApp = new SettingsAppManager();
