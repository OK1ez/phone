<script lang="ts">
  import { fly } from "svelte/transition";
  import { phoneApp } from "./phone.svelte";
  import { getTransitionDirection } from "@/lib/utils/utils";

  let CurrentRoute = $derived(phoneApp.routes[phoneApp.currentRoute].route);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key phoneApp.currentRoute}
    <div
      class="w-full h-full absolute"
      in:fly={getTransitionDirection(phoneApp.direction).in}
      out:fly={getTransitionDirection(phoneApp.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
