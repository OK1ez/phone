<script lang="ts">
  import { fly } from "svelte/transition";
  import { settingsApp } from "./state/settings-app.svelte";
  import { getTransitionDirection } from "$lib/utils/utils";

  let CurrentRoute = $derived(settingsApp.router.currentComponent);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key settingsApp.router.currentRoute}
    <div
      class="w-full h-full absolute"
      in:fly={getTransitionDirection(settingsApp.router.direction).in}
      out:fly={getTransitionDirection(settingsApp.router.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
