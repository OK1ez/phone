import type { SharedMediaAsset } from "$lib/types/media";

export type GalleryMediaAsset = SharedMediaAsset & {
  id: string | number;
  alt: string;
  timestamp?: string;
};
