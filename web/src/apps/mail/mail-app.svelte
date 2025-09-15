<script lang="ts">
  import { fly } from "svelte/transition";
  import { mailApp } from "./mail.svelte";

  import { getTransitionDirection } from "$lib/utils/utils";

  let CurrentRoute = $derived(mailApp.routes[mailApp.currentRoute].route);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key mailApp.currentRoute}
    <div
      class="w-full h-full absolute"
      in:fly={getTransitionDirection(mailApp.direction).in}
      out:fly={getTransitionDirection(mailApp.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
