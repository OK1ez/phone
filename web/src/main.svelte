<script>
  import { onMount } from "svelte";
  import { CONFIG, IS_BROWSER } from "./stores/stores";
  import { InitialiseListen } from "@/utils/listeners";
  import { InitialiseDebugSenders } from "@/utils/debug/init";
  import { InitialiseDebugReceivers } from "@/utils/debug/receivers";

  import Visibility from "@/providers/visibility.svelte";
  import Phone from "@/layout/phone.svelte";
  import Dev from "@/components/dev.svelte";

  CONFIG.set({
    fallbackResourceName: "phone",
    allowEscapeKey: true,
  });

  onMount(() => {
    if ($IS_BROWSER) {
      InitialiseDebugSenders();
      InitialiseDebugReceivers();
    }
  });

  InitialiseListen();
</script>

<Visibility>
  <Phone />
</Visibility>

{#if $IS_BROWSER}
  <Dev />
{/if}
