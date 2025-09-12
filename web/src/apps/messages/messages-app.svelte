<script lang="ts">
  import { fly } from "svelte/transition";
  import { messagesApp } from "./messages.svelte";

  import { getTransitionDirection } from "@/lib/utils/utils";

  let CurrentRoute = $derived(
    messagesApp.routes[messagesApp.currentRoute].route,
  );
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key messagesApp.currentRoute}
    <div
      class="w-full h-full absolute"
      in:fly={getTransitionDirection(messagesApp.direction).in}
      out:fly={getTransitionDirection(messagesApp.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
