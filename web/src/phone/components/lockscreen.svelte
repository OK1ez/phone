<script>
  import Background from "@/lib/assets/backgrounds/background.webp";
  import { core } from "@/lib/states/core.svelte";
  import { quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";
  import Indicator from "./indicator.svelte";

  function unlock() {
    core.isLocked = false;
  }
</script>

<div
  class="absolute w-full h-full flex items-center justify-center bg-cover z-10"
  style="background-image: url({Background});"
  out:slide={{ duration: 400, easing: quintOut, axis: "y" }}
>
  <Indicator onclick={unlock} />
</div>
