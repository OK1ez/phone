<script lang="ts">
  import { Play, Plus } from "@lucide/svelte";

  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "$lib/components/ui/drawer";

  import { galleryApp } from "../../state/gallery-app.svelte";
  import { phone } from "$phone/state/phone.svelte";
  import { onMount } from "svelte";
  import { Checkbox } from "$lib/components/ui/checkbox";

  let importImage = $state(false);
  let imageUrl = $state("");
  let isImporting = $state(false);
  let uploadToFivemanage = $state(false);

  onMount(async () => {
    const cloudId = phone.cloudId;
    if (!cloudId) {
      return;
    }

    await galleryApp.fetchGallery(cloudId);
  });

  async function handleImportImage() {
    if (isImporting || imageUrl.trim() === "") {
      return;
    }

    isImporting = true;

    const imported = await galleryApp.importImage(imageUrl, uploadToFivemanage);
    if (imported) {
      imageUrl = "";
      uploadToFivemanage = false;
      importImage = false;
    }

    isImporting = false;
  }
</script>

<div class="flex h-full w-full flex-col bg-background">
  <header class="flex shrink-0 items-center justify-between w-full mt-12 px-4 pb-3 border-b">
    <p class="font-medium text-sm">Gallery</p>
    <Drawer bind:open={importImage}>
      <DrawerTrigger>
        <button class="group relative flex items-center justify-center size-6 -my-3" aria-label="Import image">
          <Plus class="size-4 text-muted-foreground group-hover:text-foreground" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Import Image</DrawerTitle>
        </DrawerHeader>

        <div class="flex flex-col space-y-2">
          <div class="space-y-2">
            <p class="flex items-center gap-2 text-xs leading-none font-medium">Image URL</p>
            <div class="bg-input/40 hover:bg-input/50 h-8 rounded-lg w-full flex items-center px-3 space-x-2 border">
              <input
                type="text"
                class="bg-transparent text-xs w-full h-full focus:outline-hidden placeholder:text-muted-foreground mt-[0.1rem] tracking-wide"
                placeholder="Enter image URL"
                bind:value={imageUrl}
              />
            </div>
          </div>

          <div
            class="flex w-full flex-row items-center justify-between gap-2 rounded-lg border bg-input/40 pl-3 pr-2 h-8"
          >
            <div class="flex w-fit items-center gap-2 text-xs">Upload to Fivemanage</div>
            <Checkbox bind:checked={uploadToFivemanage} />
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose class="w-full">
            <button
              type="button"
              class="bg-input/40 hover:bg-input/50 text-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg border"
            >
              Cancel
            </button>
          </DrawerClose>

          <button
            type="button"
            disabled={isImporting || imageUrl.trim() === ""}
            class="bg-primary hover:bg-primary/80 text-primary-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg"
            onclick={handleImportImage}
          >
            {isImporting ? "Importing..." : "Confirm"}
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </header>

  <div class="min-h-0 flex-1 overflow-y-auto">
    <div class="grid grid-cols-4 gap-1 w-full pb-8">
      {#if galleryApp.mediaItems.length === 0}
        <div class="col-span-4 px-4 py-3 text-xs text-muted-foreground">No media found.</div>
      {/if}

      {#each galleryApp.mediaItems as media (media.id)}
        <button
          type="button"
          class="group relative block w-full aspect-square overflow-hidden bg-input/50 outline-hidden"
          onclick={() => galleryApp.openMedia(media)}
          aria-label="Open media"
        >
          {#if media.type === "image"}
            <img
              src={media.url}
              alt={media.alt}
              class="block h-full w-full object-cover hover:opacity-60"
              loading="lazy"
            />
          {:else}
            <video
              src={media.url}
              muted
              preload="metadata"
              playsinline
              class="block h-full w-full object-cover hover:opacity-60"
            ></video>

            <span class="absolute right-1.5 bottom-1.5 flex size-5 items-center justify-center rounded-full">
              <Play class="size-3 fill-foreground text-foreground" />
            </span>
          {/if}
        </button>
      {/each}
    </div>
  </div>
</div>
