import { createAppRouter } from "$apps/shared/create-app-router.svelte";

import Home from "../pages/home/home.svelte";
import NotificationsApplications from "../pages/notifications/notifications-applications.svelte";
import Notifications from "../pages/notifications/notifications.svelte";

const router = createAppRouter({
  routes: {
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
  },
  initialRoute: "settings",
});

export const settingsApp = {
  get routes() {
    return router.routes;
  },
  get currentRoute() {
    return router.currentRoute;
  },
  get direction() {
    return router.direction;
  },
  get currentComponent() {
    return router.currentComponent;
  },
  navigate(routeId: keyof typeof router.routes, back = false) {
    router.navigate(routeId, back);
  },
  reset() {
    router.reset();
  },
};
