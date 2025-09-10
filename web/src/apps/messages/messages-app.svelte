<script lang="ts">
  import { fly } from "svelte/transition";
  import { messages } from "./messages.svelte";

  import { getTransitionDirection } from "@/lib/utils/utils";

  let CurrentRoute = $derived(messages.routes[messages.currentRoute].route);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key messages.currentRoute}
    <div
      class="w-full h-full absolute"
      in:fly={getTransitionDirection(messages.direction).in}
      out:fly={getTransitionDirection(messages.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
