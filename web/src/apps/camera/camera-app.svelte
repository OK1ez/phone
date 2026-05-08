<script lang="ts">
  import Image from "@lucide/svelte/icons/image";
  import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";

  import { onDestroy, onMount } from "svelte";

  import { createCameraState } from "./camera.svelte";
  import { SendEvent } from "$lib/utils/eventsHandlers";

  type CaptureMode = "photo" | "video";
  let activeTab = $state<CaptureMode>("photo");
  let previewCanvas: HTMLCanvasElement | undefined = $state();

  const camera = createCameraState();

  onMount(() => {
    camera.mountPreview(previewCanvas);
  });

  onDestroy(() => {
    camera.destroy();
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (e.code === "AltLeft") void SendEvent<boolean>("closeNuiFocus");
  }
</script>

<svelte:window onresize={camera.resizePreview} onkeydown={handleKeyDown} />

<div class="flex h-full w-full flex-col bg-background">
  <div class="mt-4 flex h-8 w-full items-center justify-center border-b px-6 pb-4" aria-hidden="true"></div>

  <div class="relative min-h-0 flex-1 overflow-hidden bg-black">
    <canvas bind:this={previewCanvas} class="h-full w-full object-cover"></canvas>
  </div>

  <footer class="flex flex-col space-y-2 mt-auto border-t pt-5 items-center justify-between w-full pb-8 px-4">
    {#if activeTab === "photo"}
      <button
        onclick={camera.takePhoto}
        disabled={camera.isCapturing || camera.isRecording}
        class="bg-primary hover:bg-primary/80 text-primary-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg disabled:opacity-50"
      >
        Take Photo
      </button>
    {:else if activeTab === "video"}
      <button
        onclick={camera.toggleRecording}
        disabled={camera.isCapturing || !camera.canRecord}
        class="{camera.isRecording
          ? 'bg-destructive/80 hover:bg-destructive/90 text-foreground'
          : 'bg-primary hover:bg-primary/80 text-primary-foreground'} flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg disabled:opacity-50"
      >
        {#if camera.isRecording}
          Recording
        {:else}
          Record
        {/if}
      </button>
    {/if}

    <div class="flex w-full space-x-2">
      <button
        aria-label="Gallery"
        onclick={camera.openLatestMedia}
        class="bg-input/70 flex h-8 min-w-8 max-w-8 items-center justify-center outline-hidden select-none rounded-lg group overflow-hidden"
      >
        {#if camera.latestMedia}
          {#if camera.latestMedia.type === "image"}
            <img
              src={camera.latestMedia.url}
              alt={camera.latestMedia.alt || "Latest photo"}
              class="h-full w-full object-cover"
            />
          {:else}
            <video src={camera.latestMedia.url} muted class="h-full w-full object-cover" aria-label="Latest video"
            ></video>
          {/if}
        {:else}
          <Image class="size-4 text-muted-foreground group-hover:text-foreground" />
        {/if}
      </button>

      <div class="bg-input/70 inline-flex items-center justify-center h-8 p-1 text-muted-foreground rounded-lg w-full">
        <button
          class="w-full inline-flex items-center justify-center rounded-md py-1 text-xs tracking-wide hover:text-foreground select-none {activeTab ===
            'photo' && 'bg-background text-foreground shadow-xs'}"
          onclick={() => (activeTab = "photo")}
        >
          Photo
        </button>
        <button
          class="w-full inline-flex items-center justify-center rounded-md py-1 text-xs font-medium tracking-wide hover:text-foreground select-none {activeTab ===
            'video' && 'bg-background text-foreground shadow-xs'}"
          onclick={() => (activeTab = "video")}
        >
          Video
        </button>
      </div>

      <button
        onclick={camera.switchDirection}
        disabled={camera.isCapturing || camera.isRecording}
        class="bg-input/70 flex h-8 min-w-8 items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg disabled:opacity-50 group"
      >
        <RefreshCcw class="size-4 text-muted-foreground group-hover:text-foreground" />
      </button>
    </div>
  </footer>
</div>
