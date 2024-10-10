<script lang="ts">
  import { VISIBLE, CONFIG } from "@/stores/stores";
  import { ReceiveEvent, SendEvent } from "@/utils/eventsHandlers";
  import { onMount } from "svelte";

  ReceiveEvent("phone:visible", (visible: boolean): void => {
    $VISIBLE = visible;
  });

  onMount(() => {
    if (!$CONFIG.allowEscapeKey) return;

    const keyHandler = (e: KeyboardEvent) => {
      if ($VISIBLE && ["Escape"].includes(e.code)) {
        SendEvent("phone:close");
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  });
</script>

{#if $VISIBLE}
  <main class=" absolute left-0 top-0 p-0 m-0 w-full h-full overflow-hidden">
    <slot />
  </main>
{/if}
