import Home from "./pages/home/home.svelte";
import Notifications from "./pages/notifications/notifications.svelte";
import Search from "./pages/search/search.svelte";
import Profile from "./pages/profile/profile.svelte";

class BleeterApp {
  routes = {
    home: {
      label: "Home",
      route: Home,
    },
    search: {
      label: "Search",
      route: Search,
    },
    notifications: {
      label: "Notifications",
      route: Notifications,
    },
    profile: {
      label: "Profile",
      route: Profile,
    },
  };

  currentRoute: keyof typeof this.routes = $state("home");
  direction: "forward" | "back" = $state("forward");

  navigate(id: keyof typeof this.routes, back?: boolean) {
    this.direction = back ? "back" : "forward";
    this.currentRoute = id;
  }
}

export const bleeterApp = new BleeterApp();
