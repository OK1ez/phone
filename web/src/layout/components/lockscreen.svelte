<script lang="ts">
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { IS_LOCKED } from "@/stores/phone";
  import Background from "@/assets/backgrounds/background.webp";
  import Indicator from "./indicator.svelte";

  /**
   * Unlocks the phone.
   */
  function unlock(): void {
    IS_LOCKED.set(false);
  }
</script>

<div
  class="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-cover z-10"
  style="background-image: url({Background});"
  out:slide={{ duration: 400, easing: quintOut, axis: "y" }}
>
  <p class="text-lg font-medium mb-36">21:10</p>
  <Indicator onclick={unlock} />
</div>
