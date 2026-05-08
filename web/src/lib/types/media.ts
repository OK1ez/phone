export type SharedImageAsset = {
  url: string;
  alt: string;
};

export type SharedMediaAsset = {
  type: "image" | "video";
  url: string;
  alt?: string;
  filename?: string;
  id?: string | number;
};
