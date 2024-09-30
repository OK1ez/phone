<script lang="ts">
  import { VISIBLE, CONFIG } from "@/stores/stores";
  import { ReceiveEvent, SendEvent } from "@/utils/eventsHandlers";
  import { onMount } from "svelte";

  ReceiveEvent("resource:visible", (visible: boolean): void => {
    $VISIBLE = visible;
  });

  onMount(() => {
    if (!$CONFIG.allowEscapeKey) return;

    const keyHandler = (e: KeyboardEvent) => {
      if ($VISIBLE && ["Escape"].includes(e.code)) {
        SendEvent("resource:close");
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  });
</script>

{#if $VISIBLE}
  <main>
    <slot />
  </main>
{/if}

<style>
  main {
    position: absolute;
    left: 0;
    top: 0;
    user-select: none;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100vw;
  }
</style>
