<script lang="ts">
  import { Star, Clock, Contact, Grip } from "lucide-svelte";
  import { ACTIVE_PAGE } from "./stores/phone";
  import ContactsPage from "./pages/contacts/contacts-page.svelte";
  import RecentCallsPage from "./pages/recent-calls/recent-calls-page.svelte";
  import FavoritesPage from "./pages/favorites/favorites-page.svelte";
  import KeypadPage from "./pages/keypad/keypad-page.svelte"
  import BottomNav from "@/components/shared/bottom-nav.svelte";

  const pageComponents: { [key: string]: any } = {
    contacts: ContactsPage,
    recentCalls: RecentCallsPage,
    favorites: FavoritesPage,
    keypad: KeypadPage,
  };

  const buttons = [
    { icon: Star, page: "favorites" },
    { icon: Clock, page: "recentCalls" },
    { icon: Contact, page: "contacts" },
    { icon: Grip, page: "keypad" }
  ];

  const SvelteComponent = $derived(pageComponents[$ACTIVE_PAGE]);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  <SvelteComponent />
  <BottomNav
    {buttons}
    setActivePage={(page) => ACTIVE_PAGE.set(page)}
    activePage={$ACTIVE_PAGE}
  />
</div>
