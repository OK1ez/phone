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
  readonly routes = this.router.routes;

  selectedMedia = $state<GalleryMediaAsset | null>(null);
  mediaItems = $state.raw<GalleryMediaAsset[]>([]);

  currentRoute = $derived(this.router.currentRoute);
  direction = $derived(this.router.direction);
  currentComponent = $derived(this.router.currentComponent);

  async fetchGallery(cloudId: number): Promise<GalleryMediaAsset[]> {
    if (this.mediaItems.length > 0) {
      return this.mediaItems;
    }

    const gallery = await SendEvent<FetchGalleryResponse, number>("fetchGallery", cloudId);
    this.mediaItems = (gallery || []).map(toGalleryMedia);

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
        >("saveMedia", {
          cloudId,
          url: trimmedUrl,
          type: "image",
        });
      }

      if (!savedMedia) {
        throw new Error("Failed to save image");
      }

      this.mediaItems = [
        {
          ...toImportedGalleryMedia({
            ...savedMedia,
            timestamp: new Date().toISOString(),
          }),
        },
        ...this.mediaItems,
      ];

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

  openMedia(media: GalleryMediaAsset): void {
    this.selectedMedia = media;
    this.router.navigate("view");
  }

  closeMedia(): void {
    this.selectedMedia = null;
    this.router.navigate("libary", true);
  }

  navigate(routeId: keyof typeof galleryRoutes, back = false): void {
    if (routeId === "libary") {
      this.selectedMedia = null;
    }

    this.router.navigate(routeId, back);
  }

  reset(): void {
    this.selectedMedia = null;
    this.mediaItems = [];
    this.router.reset();
  }
}

export const galleryApp = new GalleryAppManager();
