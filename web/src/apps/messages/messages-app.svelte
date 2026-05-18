<script lang="ts">
  import { fly } from "svelte/transition";
  import { messagesApp } from "./state/messages-app.svelte";

  import { getTransitionDirection } from "$lib/utils/utils";

  let CurrentRoute = $derived(messagesApp.router.currentComponent);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key messagesApp.router.currentRoute}
    <div
      class="w-full h-full absolute"
      in:fly={getTransitionDirection(messagesApp.router.direction).in}
      out:fly={getTransitionDirection(messagesApp.router.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
