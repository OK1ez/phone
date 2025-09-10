import Home from "./pages/home/home.svelte";
import Notifications from "./pages/notifications/notifications.svelte";
import NotificationsApplications from "./pages/notifications/notifications-applications.svelte";

export class Settings {
  routes = {
    settings: {
      label: "Settings",
      route: Home,
    },
    notifications: {
      label: "Notifications",
      route: Notifications,
    },
    notifications_applications: {
      label: "Applications",
      route: NotificationsApplications,
    },
  };

  currentRoute: keyof typeof this.routes = $state("settings");
  direction: "forward" | "back" = $state("forward");

  navigate(id: keyof typeof this.routes, back?: boolean) {
    this.direction = back ? "back" : "forward";
    this.currentRoute = id;
  }
}

export const settings = new Settings();
