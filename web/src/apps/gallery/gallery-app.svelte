<script lang="ts">
  import { fly } from "svelte/transition";
  import { galleryApp } from "./state/gallery-app.svelte";
  import { getTransitionDirection } from "$lib/utils/utils";

  let CurrentRoute = $derived(galleryApp.currentComponent);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key galleryApp.currentRoute}
    <div
      class="w-full h-full absolute"
      in:fly={getTransitionDirection(galleryApp.direction).in}
      out:fly={getTransitionDirection(galleryApp.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
