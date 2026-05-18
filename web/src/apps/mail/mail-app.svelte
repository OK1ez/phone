<script lang="ts">
  import { fly } from "svelte/transition";
  import { mailApp } from "./state/mail-app.svelte";

  import { getTransitionDirection } from "$lib/utils/utils";

  let CurrentRoute = $derived(mailApp.router.currentComponent);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key mailApp.router.currentRoute}
    <div
      class="w-full h-full absolute"
      in:fly={getTransitionDirection(mailApp.router.direction).in}
      out:fly={getTransitionDirection(mailApp.router.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
