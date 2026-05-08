<script lang="ts">
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";

  import { galleryApp } from "../../state/gallery-app.svelte";
  const media = $derived(galleryApp.selectedMedia);
</script>

<button
  class="flex items-center w-full space-x-2 mt-12 px-4 pb-3 border-b group"
  onclick={() => galleryApp.closeMedia()}
>
  <ChevronLeft class="size-4 text-muted-foreground group-hover:text-foreground" />
  <p class="font-medium text-sm">Gallery</p>
</button>

<div class="flex h-[calc(100%-6.9rem)] items-start w-full">
  {#if media}
    {#if media.type === "image"}
      <img src={media.url} alt={media.alt} class="max-h-full max-w-full object-contain" />
    {:else}
      <video
        src={media.url}
        controls
        autoplay
        playsinline
        class="max-h-full max-w-full object-contain"
        aria-label={media.alt}
      ></video>
    {/if}
  {/if}
</div>
