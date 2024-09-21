<script lang="ts">
  import { fly } from "svelte/transition";
  import { ACTIVE_PAGE, NAVIGATION_DIRECTION } from "./stores/settings";
  import HomePage from "./pages/home/home-page.svelte";
  import CloudPage from "./pages/cloud/cloud-page.svelte";
  import GeneralPage from "./pages/general/general-page.svelte";
  import GeneralAboutPage from "./pages/general/general-about-page.svelte";
  import NotificationsPage from "./pages/notifications/notifications-page.svelte";
  import NotificationsOptionsPage from "./pages/notifications/notifications-options-page.svelte";
  import SoundsPage from "./pages/sounds/sounds-page.svelte";
  import UnlockPage from "./pages/unlock/unlock-page.svelte";
  import DisplayPage from "./pages/display/display-page.svelte";
  import WallpapersPage from "./pages/wallpapers/wallpapers-page.svelte";

  const pageComponents: { [key: string]: any } = {
    home: HomePage,
    cloud: CloudPage,
    general: GeneralPage,
    generalAbout: GeneralAboutPage,
    notifications: NotificationsPage,
    notificationsOptions: NotificationsOptionsPage,
    sounds: SoundsPage,
    unlock: UnlockPage,
    display: DisplayPage,
    wallpapers: WallpapersPage,
  };
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key $ACTIVE_PAGE}
    <div
      class="w-full h-full absolute"
      in:fly={{ x: $NAVIGATION_DIRECTION === 'forward' ? 500 : -500, duration: 300 }}
      out:fly={{ x: $NAVIGATION_DIRECTION === 'forward' ? -500 : 500, duration: 300 }}
    >
      <svelte:component this={pageComponents[$ACTIVE_PAGE]} />
    </div>
  {/key}
</div>
