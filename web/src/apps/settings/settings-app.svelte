<script lang="ts">
  import { fly } from "svelte/transition";
  import { ACTIVE_PAGE, NAVIGATION_DIRECTION } from "./stores/settings";
  import type { ComponentType } from 'svelte';

  type RouteKey = 'home' | 'cloud' | 'cloudLogin' | 'general' | 'generalAbout' |
    'notifications' | 'notificationsOptions' | 'sounds' | 'unlock' |
    'display' | 'wallpapers';

  const routes: Record<RouteKey, () => Promise<{ default: ComponentType }>> = {
    home: () => import("./pages/home/home-page.svelte"),
    cloud: () => import("./pages/cloud/cloud-page.svelte"),
    cloudLogin: () => import("./pages/cloud/cloud-login-page.svelte"),
    general: () => import("./pages/general/general-page.svelte"),
    generalAbout: () => import("./pages/general/general-about-page.svelte"),
    notifications: () => import("./pages/notifications/notifications-page.svelte"),
    notificationsOptions: () => import("./pages/notifications/notifications-options-page.svelte"),
    sounds: () => import("./pages/sounds/sounds-page.svelte"),
    unlock: () => import("./pages/unlock/unlock-page.svelte"),
    display: () => import("./pages/display/display-page.svelte"),
    wallpapers: () => import("./pages/wallpapers/wallpapers-page.svelte"),
  };

  let CurrentComponent: ComponentType | null = null;

  $: loadComponent($ACTIVE_PAGE);

  async function loadComponent(page: RouteKey) {
    try {
      const importPromise = routes[page];
      if (importPromise) {
        const module = await importPromise();
        CurrentComponent = module.default;
      }
    } catch (error) {
      console.error('Failed to load component:', error);
      CurrentComponent = null;
    }
  }
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key $ACTIVE_PAGE}
    <div
      class="w-full h-full absolute"
      in:fly={{ x: $NAVIGATION_DIRECTION === 'forward' ? 500 : -500, duration: 300 }}
      out:fly={{ x: $NAVIGATION_DIRECTION === 'forward' ? -500 : 500, duration: 300 }}
    >
      {#if CurrentComponent}
        <svelte:component this={CurrentComponent} />
      {/if}
    </div>
  {/key}
</div>
