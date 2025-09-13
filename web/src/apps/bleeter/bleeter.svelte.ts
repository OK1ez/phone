import Home from "./pages/home/home.svelte";
import Notifications from "./pages/notifications/notifications.svelte";
import Search from "./pages/search/search.svelte";
import Profile from "./pages/profile/profile.svelte";

interface ProfileData {
  username: string;
  handle: string;
  avatar: string;
  verified: boolean;
  bio: string;
  followers: string;
  posts: Array<{
    avatar: string;
    username: string;
    verified: boolean;
    timestamp: string;
    content: string;
    likes: number;
    comments: number;
    reposts: number;
  }>;
}

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

  profileOverlay = $state({
    isOpen: false,
    profileData: null as ProfileData | null,
  });

  navigate(id: keyof typeof this.routes, back?: boolean) {
    this.direction = back ? "back" : "forward";
    this.currentRoute = id;
    if (this.profileOverlay.isOpen) {
      this.closeProfile();
    }
  }

  openProfile(profileData: ProfileData) {
    this.profileOverlay.profileData = profileData;
    this.profileOverlay.isOpen = true;
  }

  closeProfile() {
    this.profileOverlay.isOpen = false;
    this.profileOverlay.profileData = null;
  }
}

export const bleeterApp = new BleeterApp();
