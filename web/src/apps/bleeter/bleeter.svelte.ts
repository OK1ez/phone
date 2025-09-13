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

interface PostData {
  id: string;
  avatar: string;
  username: string;
  verified: boolean;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  reposts: number;
  replies: Array<{
    id: string;
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

  postView = $state({
    isOpen: false,
    postData: null as PostData | null,
  });

  navigate(id: keyof typeof this.routes, back?: boolean) {
    this.direction = back ? "back" : "forward";
    this.currentRoute = id;
    if (this.profileOverlay.isOpen) {
      this.closeProfile();
    }
    if (this.postView.isOpen) {
      this.closePostView();
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

  openPostView(postData: PostData) {
    this.postView.postData = postData;
    this.postView.isOpen = true;
  }

  closePostView() {
    this.postView.isOpen = false;
    this.postView.postData = null;
  }
}

export const bleeterApp = new BleeterApp();
