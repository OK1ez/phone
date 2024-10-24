<script lang="ts">
  import { fly } from "svelte/transition";
  import { ACTIVE_PAGE, SELECTED_USER, SELECTED_BLEET } from "./stores/bleeter";
  import { Plus, BellDot, Home, Search, User } from "lucide-svelte";
  import HomePage from "./pages/home/home-page.svelte";
  import SearchPage from "./pages/search/search-page.svelte";
  import NotificationsPage from "./pages/notifications/notifications-page.svelte";
  import ProfilePage from "./pages/profile/profile-page.svelte";
  import BottomNav from "@/components/shared/bottom-nav.svelte";
  import BleetPage from "./pages/bleet/bleet-page.svelte";

  interface PageComponent {
    [key: string]: ComponentType;
  }

  interface NavButton {
    icon: ComponentType;
    page: string;
  }

  const pageComponents: PageComponent = {
    home: HomePage,
    search: SearchPage,
    notifications: NotificationsPage,
    profile: ProfilePage,
  };

  const buttons: NavButton[] = [
    { icon: Home, page: "home" },
    { icon: Search, page: "search" },
    { icon: BellDot, page: "notifications" },
    { icon: User, page: "profile" },
  ];

  /**
   * Sets the active page and resets user and bleet selection.
   * @param {string} page - The page to set as active.
   */
  function setActivePage(page: string): void {
    ACTIVE_PAGE.set(page);
    SELECTED_USER.set(null);
    SELECTED_BLEET.set(null);
  }

  const SvelteComponent = $derived(pageComponents[$ACTIVE_PAGE]);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  <SvelteComponent />

  {#if $SELECTED_USER}
    <div
      class="absolute inset-0 flex flex-col bg-background"
      transition:fly={{ x: 500, duration: 300 }}
    >
      <ProfilePage isOverlay={true} />
    </div>
  {/if}

  {#if $SELECTED_BLEET}
    <div
      class="absolute inset-0 flex flex-col bg-background"
      transition:fly={{ x: 500, duration: 300 }}
    >
      <BleetPage />
    </div>
  {/if}

  <button
    class="absolute bottom-0 right-0 flex items-center justify-center m-4 rounded-full shadow-md size-16 mb-28 bg-secondary hover:opacity-80 group"
    aria-label="New bleet"
  >
    <Plus class="text-gray-400 group-hover:text-foreground" />
  </button>

  <BottomNav {buttons} {setActivePage} activePage={$ACTIVE_PAGE} />
</div>
