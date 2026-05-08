import { createAppRouter } from "$apps/shared/create-app-router.svelte";
import { SendEvent } from "$lib/utils/eventsHandlers";
import { persistMedia } from "$lib/utils/media-upload";
import type { SharedMediaAsset } from "$lib/types/media";
import { phone } from "$phone/state/phone.svelte";
import { notifications } from "$phone/state/notifications.svelte";
import Library from "../pages/library/library.svelte";
import View from "../pages/view/view.svelte";

import type { GalleryMediaAsset } from "../media";

let selectedMedia = $state<GalleryMediaAsset | null>(null);
let mediaItems = $state.raw<GalleryMediaAsset[]>([]);
let loadedCloudId = $state<number | null>(null);

type FetchGalleryResponse = {
  id: number;
  url: string;
  type: "image" | "video";
  timestamp: string;
}[];
type SaveMediaResponse = SharedMediaAsset | false;

function toGalleryMedia(media: FetchGalleryResponse[number] | (GalleryMediaAsset & { filename?: string })) {
  return {
    id: media.id,
    url: media.url,
    type: media.type,
    timestamp: media.timestamp,
    alt: media.type === "video" ? "Recorded video" : "Gallery photo",
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

const router = createAppRouter({
  routes: {
    libary: {
      label: "Recents",
      component: Library,
    },
    view: {
      label: "View",
      component: View,
    },
  },
  initialRoute: "libary",
});

export const galleryApp = {
  get routes() {
    return router.routes;
  },
  get currentRoute() {
    return router.currentRoute;
  },
  get direction() {
    return router.direction;
  },
  get currentComponent() {
    return router.currentComponent;
  },
  get selectedMedia() {
    return selectedMedia;
  },
  get mediaItems() {
    return mediaItems;
  },
  async fetchGallery(cloudId: number) {
    if (loadedCloudId === cloudId) {
      return mediaItems;
    }

    const gallery = await SendEvent<FetchGalleryResponse, number>("fetchGallery", cloudId);
    mediaItems = (gallery || []).map(toGalleryMedia);
    loadedCloudId = cloudId;

    return mediaItems;
  },
  async importImage(url: string, uploadToFivemanage = false) {
    const cloudId = phone.data.activeCloudId;
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

      mediaItems = [
        {
          ...toGalleryMedia({
            ...savedMedia,
            timestamp: new Date().toISOString(),
          }),
        },
        ...mediaItems,
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
  },
  openMedia(media: GalleryMediaAsset) {
    selectedMedia = media;
    router.navigate("view");
  },
  closeMedia() {
    selectedMedia = null;
    router.navigate("libary", true);
  },
  navigate(routeId: keyof typeof router.routes, back = false) {
    if (routeId === "libary") {
      selectedMedia = null;
    }

    router.navigate(routeId, back);
  },
  reset() {
    selectedMedia = null;
    router.reset();
  },
};
