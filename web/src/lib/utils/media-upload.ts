import type { SharedMediaAsset } from "$lib/types/media";
import { app } from "$lib/states/app.svelte";
import { SendEvent } from "./eventsHandlers";

type UploadResponse = {
  data?: {
    url?: string;
  };
};

type UploadUrlResponse = string | null;
type SaveMediaResponse = SharedMediaAsset | false;

type PersistMediaOptions = {
  cloudId: number;
  type: SharedMediaAsset["type"];
  blob: Blob;
  extension: string;
  source: string;
};

const UPLOAD_URL_ERROR = "Failed to request upload URL";

function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Failed to read blob as data URL"));
        return;
      }

      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to read blob as data URL"));
    };

    reader.readAsDataURL(blob);
  });
}

async function requestUploadUrl(): Promise<string | null> {
  try {
    const presignedUrl = await SendEvent<UploadUrlResponse>("getUploadURL");

    if (typeof presignedUrl !== "string" || presignedUrl.length === 0) {
      console.error(UPLOAD_URL_ERROR);
      return null;
    }

    return presignedUrl;
  } catch {
    console.error(UPLOAD_URL_ERROR);
    return null;
  }
}

export async function persistMedia({
  cloudId,
  type,
  blob,
  extension,
  source,
}: PersistMediaOptions): Promise<(SharedMediaAsset & { filename: string }) | false> {
  const filename = `phone-${type}-${getTimestamp()}.${extension}`;

  if (app.isBrowser) {
    const mediaUrl = await blobToDataUrl(blob);
    const savedMedia = await SendEvent<
      SaveMediaResponse,
      { cloudId: number; url: string; type: SharedMediaAsset["type"] }
    >("saveMedia", {
      cloudId,
      url: mediaUrl,
      type,
    });

    if (!savedMedia) {
      return false;
    }

    return {
      ...savedMedia,
      filename,
    };
  }

  const presignedUrl = await requestUploadUrl();

  if (!presignedUrl) {
    return false;
  }

  const metadata = {
    name: filename,
    source,
    type,
  };

  const formData = new FormData();
  formData.append("file", blob, filename);
  formData.append("filename", filename);
  formData.append("path", source);
  formData.append("metadata", JSON.stringify(metadata));

  try {
    const response = await fetch(presignedUrl, {
      method: "POST",
      body: formData,
    });

    const payload = (await response.json().catch(() => null)) as UploadResponse | null;

    if (!response.ok || !payload?.data?.url) {
      return false;
    }

    const savedMedia = await SendEvent<
      SaveMediaResponse,
      { cloudId: number; url: string; type: SharedMediaAsset["type"] }
    >("saveMedia", {
      cloudId,
      url: payload.data.url,
      type,
    });

    if (!savedMedia) {
      return false;
    }

    return {
      ...savedMedia,
      filename,
    };
  } catch {
    return false;
  }
}
