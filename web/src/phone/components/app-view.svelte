<script>
  import { scale } from "svelte/transition";
  import { core } from "@/lib/states/core.svelte";

  import Indicator from "./indicator.svelte";

  let CurrentApp = $derived(core.getCurrentAppComponent());

  function closeApp() {
    core.currentApp = null;
  }
</script>

<div
  class="relative flex flex-col w-full h-full bg-background z-20"
  transition:scale={{ start: 0.5, duration: 250 }}
>
  {#if CurrentApp}
    <CurrentApp />
  {/if}
  <Indicator onclick={closeApp} />
</div>
