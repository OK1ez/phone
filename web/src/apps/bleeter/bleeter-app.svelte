<script lang="ts">
  import { ACTIVE_PAGE } from "./stores/bleeter";
  import { Plus, BellDot, Home, Search, User } from "lucide-svelte";
  import HomePage from "./pages/home/home-page.svelte";
  import SearchPage from "./pages/search/search-page.svelte";
  import NotificationsPage from "./pages/notifications/notifications-page.svelte";
  import ProfilePage from "./pages/profile/profile-page.svelte";
  import BottomNav from "@/components/shared/bottom-nav.svelte";

  const pageComponents: { [key: string]: any } = {
    home: HomePage,
    search: SearchPage,
    notifications: NotificationsPage,
    profile: ProfilePage,
  };

  const buttons = [
    { icon: Home, page: "home" },
    { icon: Search, page: "search" },
    { icon: BellDot, page: "notifications" },
    { icon: User, page: "profile" },
  ];
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  <svelte:component this={pageComponents[$ACTIVE_PAGE]} />

  <button
    class="absolute bottom-0 right-0 flex items-center justify-center m-4 rounded-full shadow-md size-16 mb-28 bg-secondary hover:opacity-80 group"
  >
    <Plus class="text-gray-400 group-hover:text-foreground" />
  </button>

  <BottomNav
    {buttons}
    setActivePage={(page) => ACTIVE_PAGE.set(page)}
    activePage={$ACTIVE_PAGE}
  />
</div>
