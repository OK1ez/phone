<script lang="ts">
  import { ACTIVE_PAGE } from "./stores/phone";
  import BottomNav from "./components/bottom-nav.svelte";
  import ContactsPage from "./pages/contacts/contacts-page.svelte";
  import RecentCallsPage from "./pages/recent-calls/recent-calls-page.svelte";
  import FavoritesPage from "./pages/favorites/favorites-page.svelte";
  import KeypadPage from "./pages/keypad/keypad-page.svelte"

  const pageComponents: { [key: string]: any } = {
    contacts: ContactsPage,
    recentCalls: RecentCallsPage,
    favorites: FavoritesPage,
    keypad: KeypadPage,
  };

  function renderActivePage() {
    return pageComponents[$ACTIVE_PAGE];
  }
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  <svelte:component this={renderActivePage()} />
  <BottomNav />
</div>