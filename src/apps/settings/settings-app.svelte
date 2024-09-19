<script lang="ts">
  import { fly } from "svelte/transition";
  import { ACTIVE_PAGE } from "./stores/settings";

  import HomePage from "./pages/home/home-page.svelte";
  import CloudPage from "./pages/cloud/cloud-page.svelte";
  import GeneralPage from "./pages/general/general-page.svelte";
  import NotificationsPage from "./pages/notifications/notifications-page.svelte";
  import SoundsPage from "./pages/sounds/sounds-page.svelte";
  import UnlockPage from "./pages/unlock/unlock-page.svelte";
  import DisplayPage from "./pages/display/display-page.svelte";
  import WallpapersPage from "./pages/wallpapers/wallpapers-page.svelte";

  const pageComponents: { [key: string]: any } = {
    home: HomePage,
    cloud: CloudPage,
    general: GeneralPage,
    notifications: NotificationsPage,
    sounds: SoundsPage,
    unlock: UnlockPage,
    display: DisplayPage,
    wallpapers: WallpapersPage,
  };

  let inFlyParams: { x: number; duration: number };
  let outFlyParams: { x: number; duration: number };

  $: ({ inFlyParams, outFlyParams } = $ACTIVE_PAGE === "home"
    ? { inFlyParams: { x: -500, duration: 300 }, outFlyParams: { x: 500, duration: 300 } }
    : { inFlyParams: { x: 500, duration: 300 }, outFlyParams: { x: -500, duration: 300 } });
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key $ACTIVE_PAGE}
    <div
      class="w-full h-full absolute"
      in:fly={inFlyParams}
      out:fly={outFlyParams}
    >
      <svelte:component this={pageComponents[$ACTIVE_PAGE]} />
    </div>
  {/key}
</div>