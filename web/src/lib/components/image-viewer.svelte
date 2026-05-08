<script lang="ts">
  import X from "@lucide/svelte/icons/x";
  import type { SharedImageAsset } from "$lib/types/media";

  interface Props {
    image: SharedImageAsset | null;
    onClose?: () => void;
  }

  let { image, onClose }: Props = $props();

  function closeViewer() {
    onClose?.();
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeViewer();
    }
  }

  function handleBackdropKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      closeViewer();
    }
  }
</script>

{#if image}
  <div
    class="fixed inset-0 z-60 flex items-center justify-center"
    role="button"
    tabindex="0"
    aria-label="Close image viewer"
    onclick={handleBackdropClick}
    onkeydown={handleBackdropKeydown}
  >
    <div class="relative max-w-full">
      <button
        type="button"
        class="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/60 hover:bg-black"
        aria-label="Close image viewer"
        onclick={closeViewer}
      >
        <X class="size-4" />
      </button>

      <img
        src={image.url}
        alt={image.alt}
        class="max-h-[70vh] max-w-full rounded-3xl border object-contain"
        draggable="false"
      />
    </div>
  </div>
{/if}
