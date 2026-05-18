import { createAppRouter } from "$apps/shared/create-app-router.svelte";

import Home from "../pages/home/home.svelte";
import Notifications from "../pages/notifications/notifications.svelte";
import Profile from "../pages/profile/profile.svelte";
import Search from "../pages/search/search.svelte";

export interface BleeterProfilePost {
  avatar: string;
  username: string;
  verified: boolean;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  reposts: number;
}

export interface BleeterProfileData {
  username: string;
  handle: string;
  avatar: string;
  verified: boolean;
  bio: string;
  followers: string;
  posts: BleeterProfilePost[];
}

export interface BleeterReply {
  id: string;
  avatar: string;
  username: string;
  verified: boolean;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  reposts: number;
}

export interface BleeterPostData {
  id: string;
  avatar: string;
  username: string;
  verified: boolean;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  reposts: number;
  replies: BleeterReply[];
}

const bleeterRoutes = {
  home: {
    label: "Home",
    component: Home,
  },
  search: {
    label: "Search",
    component: Search,
  },
  notifications: {
    label: "Notifications",
    component: Notifications,
  },
  profile: {
    label: "Profile",
    component: Profile,
  },
} as const;

export class BleeterAppManager {
  readonly router = createAppRouter({
    routes: bleeterRoutes,
    initialRoute: "home",
    onNavigate: () => {
      this.closeProfile();
      this.closePostView();
    },
  });
  readonly routes = this.router.routes;

  profileOverlay = $state({
    isOpen: false,
    profileData: null as BleeterProfileData | null,
  });

  postView = $state({
    isOpen: false,
    postData: null as BleeterPostData | null,
  });

  currentRoute = $derived(this.router.currentRoute);
  direction = $derived(this.router.direction);
  currentComponent = $derived(this.router.currentComponent);

  navigate(routeId: keyof typeof bleeterRoutes, back = false): void {
    this.router.navigate(routeId, back);
  }

  reset(): void {
    this.router.reset();
    this.closeProfile();
    this.closePostView();
  }

  openProfile(profileData: BleeterProfileData): void {
    this.profileOverlay.profileData = profileData;
    this.profileOverlay.isOpen = true;
  }

  closeProfile(): void {
    this.profileOverlay.isOpen = false;
    this.profileOverlay.profileData = null;
  }

  openPostView(postData: BleeterPostData): void {
    this.postView.postData = postData;
    this.postView.isOpen = true;
  }

  closePostView(): void {
    this.postView.isOpen = false;
    this.postView.postData = null;
  }
}

export const bleeterApp = new BleeterAppManager();
