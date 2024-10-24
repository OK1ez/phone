<script lang="ts">
  import { VISIBLE, CONFIG } from "@/stores/stores";
  import { ReceiveEvent, SendEvent } from "@/utils/eventsHandlers";
  import { onMount } from "svelte";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  ReceiveEvent("phone:visible", (state: string): void => {
    $VISIBLE = state ? "visible" : "hidden";
  });

  onMount(() => {
    if (!$CONFIG.allowEscapeKey) return;

    const keyHandler = (e: KeyboardEvent) => {
      if ($VISIBLE === "visible" && ["Escape"].includes(e.code)) {
        SendEvent("phone:close");
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  });
</script>

{#if $VISIBLE === "visible" || $VISIBLE === "half-visible"}
  <main class=" absolute left-0 top-0 p-0 m-0 w-full h-full overflow-hidden">
    {@render children?.()}
  </main>
{/if}
