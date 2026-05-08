import type { SharedImageAsset } from "$lib/types/media";

export class MediaViewerManager {
  // State
  activeImage = $state<SharedImageAsset | null>(null);

  openImage(image: SharedImageAsset): void {
    this.activeImage = image;
  }

  closeImage(): void {
    this.activeImage = null;
  }

  reset(): void {
    this.activeImage = null;
  }
}

export const mediaViewer = new MediaViewerManager();
