<script lang="ts">
  import { fly } from "svelte/transition";
  import { settingsApp } from "./settings.svelte";
  import { getTransitionDirection } from "@/lib/utils/utils";

  let CurrentRoute = $derived(
    settingsApp.routes[settingsApp.currentRoute].route,
  );
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key settingsApp.currentRoute}
    <div
      class="w-full h-full absolute"
      in:fly={getTransitionDirection(settingsApp.direction).in}
      out:fly={getTransitionDirection(settingsApp.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
