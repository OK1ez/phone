<script lang="ts">
  import { ACTIVE_PAGE } from "./stores/bleeter";
  import { Plus } from "lucide-svelte";
  import BottomNav from "./components/bottom-nav.svelte";
  import HomePage from "./pages/home/home-page.svelte";
  import SearchPage from "./pages/search/search-page.svelte";
  import NotificationsPage from "./pages/notifications/notifications-page.svelte";
  import ProfilePage from "./pages/profile/profile-page.svelte";

  const pageComponents: { [key: string]: any } = {
    home: HomePage,
    search: SearchPage,
    notifications: NotificationsPage,
    profile: ProfilePage,
  };

  function renderActivePage() {
    return pageComponents[$ACTIVE_PAGE];
  }
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  <svelte:component this={renderActivePage()} />

  <button class="absolute bottom-0 right-0 flex items-center justify-center m-4 rounded-full shadow-md w-14 h-14 mb-28 bg-secondary hover:opacity-80 group">
    <Plus class="text-gray-400 group-hover:text-foreground" />
  </button>

  <BottomNav />
</div>