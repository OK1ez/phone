<script lang="ts">
  import Copy from "@lucide/svelte/icons/copy";
  import Save from "@lucide/svelte/icons/save";
  import Maximize from "@lucide/svelte/icons/maximize-2";
  import { setClipboard } from "$lib/utils/utils";
  import type { SharedImageAsset } from "$lib/types/media";
  import { notifications } from "$phone/state/notifications.svelte";

  interface Props {
    image: SharedImageAsset;
    shellClass?: string;
    onOpen?: (image: SharedImageAsset) => void;
  }

  let { image, shellClass = "", onOpen }: Props = $props();

  function copyAssetLink() {
    setClipboard(image.url);
    notifications.enqueue({
      appId: "phone",
      title: "System",
      body: "Image URLs copied to clipboard",
    });
  }

  function saveAsset() {
    notifications.enqueue({
      appId: "phone",
      title: "Gallery",
      body: "Imaged saved to gallery",
    });
  }

  function openImageViewer(event?: MouseEvent) {
    event?.stopPropagation();
    onOpen?.(image);
  }
</script>

<div class="group relative aspect-4/3 overflow-hidden rounded-[0.95rem] {shellClass}">
  <img src={image.url} alt={image.alt} class="h-full w-full object-cover" loading="lazy" draggable="false" />
  <div
    class="absolute inset-0 bg-linear-to-t from-black/40 via-black/20 to-transparent opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
  ></div>
  <div class="absolute right-2 top-2 flex flex-col gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
    <button
      type="button"
      class="flex size-7 items-center justify-center rounded-sm bg-background text-muted-foreground transition-colors hover:text-foreground"
      aria-label="Open image viewer"
      onclick={openImageViewer}
    >
      <Maximize class="size-3.5" />
    </button>
    <button
      type="button"
      class="flex size-7 items-center justify-center rounded-sm bg-background text-muted-foreground transition-colors hover:text-foreground"
      aria-label="Copy image link"
      onclick={copyAssetLink}
    >
      <Copy class="size-3.5" />
    </button>
    <button
      type="button"
      class="flex size-7 items-center justify-center rounded-sm bg-background text-muted-foreground transition-colors hover:text-foreground"
      aria-label="Save image"
      onclick={saveAsset}
    >
      <Save class="size-3.5" />
    </button>
  </div>
</div>
