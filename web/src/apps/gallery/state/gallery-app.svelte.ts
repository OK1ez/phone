import { createAppRouter } from "$apps/shared/create-app-router.svelte";
import { SendEvent } from "$lib/utils/eventsHandlers";
import { persistMedia } from "$lib/utils/media-upload";
import type { SharedMediaAsset } from "$lib/types/media";
import { phone } from "$phone/state/phone.svelte";
import { notifications } from "$phone/state/notifications.svelte";
import Library from "../pages/library/library.svelte";
import View from "../pages/view/view.svelte";

import type { GalleryMediaAsset } from "../media";

type FetchGalleryResponse = {
  id: number;
  url: string;
  type: "image" | "video";
  timestamp: string;
}[];
type SaveMediaResponse = SharedMediaAsset | false;

function toGalleryMedia(media: FetchGalleryResponse[number]) {
  return {
    id: media.id,
    url: media.url,
    type: media.type,
    timestamp: media.timestamp,
    alt: media.type === "video" ? "Recorded video" : "Gallery photo",
  } satisfies GalleryMediaAsset;
}

function toImportedGalleryMedia(
  media: SharedMediaAsset & {
    filename?: string;
    timestamp: string;
  },
) {
  return {
    id: media.id ?? media.url,
    url: media.url,
    type: media.type,
    timestamp: media.timestamp,
    alt: media.alt || (media.type === "video" ? "Recorded video" : "Gallery photo"),
  } satisfies GalleryMediaAsset;
}

function getImageExtension(contentType: string) {
  if (contentType === "image/jpeg") {
    return "jpg";
  }

  if (contentType.startsWith("image/")) {
    return contentType.slice("image/".length).replace("+xml", "");
  }

  return "png";
}

const galleryRoutes = {
  libary: {
    label: "Recents",
    component: Library,
  },
  view: {
    label: "View",
    component: View,
  },
} as const;

export class GalleryAppManager {
  readonly router = createAppRouter({
    routes: galleryRoutes,
    initialRoute: "libary",
  });

  selectedMedia = $state<GalleryMediaAsset | null>(null);
  mediaItems = $state.raw<GalleryMediaAsset[]>([]);
  hasLoadedGallery = $state(false);

  async fetchMedia(cloudId: number): Promise<GalleryMediaAsset[]> {
    if (this.hasLoadedGallery) {
      return this.mediaItems;
    }

    const gallery = await SendEvent<FetchGalleryResponse, number>("fetchMedia", cloudId);
    const fetchedMedia = (gallery || []).map(toGalleryMedia);
    const localMedia = this.mediaItems.filter((media) => {
      return !fetchedMedia.some((fetchedItem) => fetchedItem.id === media.id || fetchedItem.url === media.url);
    });

    this.mediaItems = [...localMedia, ...fetchedMedia];
    this.hasLoadedGallery = true;

    return this.mediaItems;
  }

  async importImage(url: string, uploadToFivemanage = false): Promise<boolean> {
    const cloudId = phone.cloudId;
    const trimmedUrl = url.trim();

    if (!cloudId || trimmedUrl === "") {
      return false;
    }

    try {
      let savedMedia: (SharedMediaAsset & { filename?: string }) | false = false;

      if (uploadToFivemanage) {
        const response = await fetch(trimmedUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.startsWith("image/")) {
          throw new Error("Invalid image type");
        }

        const blob = await response.blob();
        if (blob.size === 0) {
          throw new Error("Empty image");
        }

        savedMedia = await persistMedia({
          cloudId,
          type: "image",
          blob,
          extension: getImageExtension(contentType),
          source: "gallery",
        });
      } else {
        savedMedia = await SendEvent<
          SaveMediaResponse,
          { cloudId: number; url: string; type: SharedMediaAsset["type"] }
        >("createMedia", {
          cloudId,
          url: trimmedUrl,
          type: "image",
        });
      }

      if (!savedMedia) {
        throw new Error("Failed to save image");
      }

      this.addMedia({
        ...savedMedia,
        timestamp: new Date().toISOString(),
      });

      notifications.enqueue({
        appId: "gallery",
        title: "Gallery",
        body: "Image imported",
      });

      return true;
    } catch {
      notifications.enqueue({
        appId: "gallery",
        title: "Gallery",
        body: "Failed to import image",
      });

      return false;
    }
  }

  addMedia(media: SharedMediaAsset & { timestamp?: string }): GalleryMediaAsset {
    const galleryMedia = toImportedGalleryMedia({
      ...media,
      timestamp: media.timestamp ?? new Date().toISOString(),
    });

    const alreadyExists = this.mediaItems.some((mediaItem) => {
      return mediaItem.id === galleryMedia.id || mediaItem.url === galleryMedia.url;
    });

    if (!alreadyExists) {
      this.mediaItems = [galleryMedia, ...this.mediaItems];
    }

    return galleryMedia;
  }

  openMedia(media: GalleryMediaAsset): void {
    this.selectedMedia = media;
    this.router.navigate("view");
  }

  closeMedia(): void {
    this.openLibrary(true);
  }

  openLibrary(back = false): void {
    this.selectedMedia = null;
    this.router.navigate("libary", back);
  }

  reset(): void {
    this.selectedMedia = null;
    this.mediaItems = [];
    this.hasLoadedGallery = false;
    this.router.reset();
  }
}

export const galleryApp = new GalleryAppManager();
