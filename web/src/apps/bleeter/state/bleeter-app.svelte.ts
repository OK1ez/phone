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

let profileOverlay = $state({
  isOpen: false,
  profileData: null as BleeterProfileData | null,
});

let postView = $state({
  isOpen: false,
  postData: null as BleeterPostData | null,
});

const router = createAppRouter({
  routes: {
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
  },
  initialRoute: "home",
  onNavigate() {
    profileOverlay.isOpen = false;
    profileOverlay.profileData = null;
    postView.isOpen = false;
    postView.postData = null;
  },
});

export const bleeterApp = {
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
  get profileOverlay() {
    return profileOverlay;
  },
  get postView() {
    return postView;
  },
  navigate(routeId: keyof typeof router.routes, back = false) {
    router.navigate(routeId, back);
  },
  reset() {
    router.reset();
    profileOverlay.isOpen = false;
    profileOverlay.profileData = null;
    postView.isOpen = false;
    postView.postData = null;
  },
  openProfile(profileData: BleeterProfileData) {
    profileOverlay.profileData = profileData;
    profileOverlay.isOpen = true;
  },
  closeProfile() {
    profileOverlay.isOpen = false;
    profileOverlay.profileData = null;
  },
  openPostView(postData: BleeterPostData) {
    postView.postData = postData;
    postView.isOpen = true;
  },
  closePostView() {
    postView.isOpen = false;
    postView.postData = null;
  },
};
