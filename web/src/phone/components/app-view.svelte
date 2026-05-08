<script lang="ts">
  import { scale } from "svelte/transition";

  import Indicator from "./indicator.svelte";
  import { phone } from "$phone/state/phone.svelte";
  import DrawerHost from "$lib/components/ui/drawer/drawer-host.svelte";
  import { createDrawerHostContext } from "$lib/components/ui/drawer/drawer-context.svelte";

  const drawerHost = createDrawerHostContext();
  let CurrentApp = $derived(phone.activeAppComponent);

  function closeApp() {
    phone.closeApp();
  }
</script>

<div class="relative h-full w-full" transition:scale={{ start: 0.5, duration: 250 }}>
  <div class="relative z-20 flex h-full w-full flex-col bg-background">
    {#if CurrentApp}
      <CurrentApp />
    {/if}
  </div>

  <DrawerHost host={drawerHost} />
  <div class="absolute inset-x-0 bottom-0 z-90">
    <Indicator onclick={closeApp} />
  </div>
</div>
