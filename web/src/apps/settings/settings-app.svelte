<script lang="ts">
  import { fly } from "svelte/transition";
  import { settings } from "./settings.svelte";
  import { getTransitionDirection } from "@/lib/utils/utils";

  let CurrentRoute = $derived(settings.routes[settings.currentRoute].route);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key settings.currentRoute}
    <div
      class="w-full h-full absolute"
      in:fly={getTransitionDirection(settings.direction).in}
      out:fly={getTransitionDirection(settings.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
