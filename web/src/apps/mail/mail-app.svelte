<script lang="ts">
  import { fly } from "svelte/transition";
  import { mail } from "./mail.svelte";

  import { getTransitionDirection } from "@/lib/utils/utils";

  let CurrentRoute = $derived(mail.routes[mail.currentRoute].route);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key mail.currentRoute}
    <div
      class="w-full h-full absolute"
      in:fly={getTransitionDirection(mail.direction).in}
      out:fly={getTransitionDirection(mail.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
