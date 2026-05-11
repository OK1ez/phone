import { galleryApp } from "$apps/gallery/state/gallery-app.svelte";
import type { SharedMediaAsset } from "$lib/types/media";
import { SendEvent } from "$lib/utils/eventsHandlers";
import { persistMedia } from "$lib/utils/media-upload";
import { createGameView } from "$lib/utils/screencapture/gameview";
import { phone } from "$phone/state/phone.svelte";

type CameraDirection = "front" | "rear";

type GameView = ReturnType<typeof createGameView>;

const GAME_VIEW_ASPECT_RATIO = 16 / 9;
const CAPTURE_OUTPUT_WIDTH = 1980;
const CAPTURE_OUTPUT_HEIGHT = 1080;
const IMAGE_QUALITY = 1;
const VIDEO_FRAME_RATE = 30;
const MAX_RECORDING_MS = 30_000;

type Dimensions = {
  width: number;
  height: number;
};

function waitForFrames(count: number) {
  return new Promise<void>((resolve) => {
    let framesWaited = 0;

    function waitFrame() {
      framesWaited += 1;

      if (framesWaited >= count) {
        resolve();
        return;
      }

      requestAnimationFrame(waitFrame);
    }

    requestAnimationFrame(waitFrame);
  });
}

function calculateGameViewDimensions(width: number, height: number): Dimensions {
  const currentAspectRatio = width / height;

  if (currentAspectRatio > GAME_VIEW_ASPECT_RATIO) {
    return {
      width,
      height: Math.max(1, Math.round(width / GAME_VIEW_ASPECT_RATIO)),
    };
  }

  return {
    width: Math.max(1, Math.round(height * GAME_VIEW_ASPECT_RATIO)),
    height,
  };
}

function getCanvasDisplayDimensions(canvas: HTMLCanvasElement | undefined): Dimensions {
  const bounds = canvas?.getBoundingClientRect();

  if (bounds?.width && bounds?.height) {
    return {
      width: Math.max(1, Math.floor(bounds.width)),
      height: Math.max(1, Math.floor(bounds.height)),
    };
  }

  return {
    width: Math.max(1, Math.floor(window.innerWidth)),
    height: Math.max(1, Math.floor(window.innerHeight)),
  };
}

function getCaptureOutputDimensions(): Dimensions {
  return {
    width: CAPTURE_OUTPUT_WIDTH,
    height: CAPTURE_OUTPUT_HEIGHT,
  };
}

function getCroppedOutputDimensions(sourceDimensions: Dimensions, cropAspectRatio: number): Dimensions {
  const sourceAspectRatio = sourceDimensions.width / sourceDimensions.height;

  if (sourceAspectRatio > cropAspectRatio) {
    return {
      width: Math.max(1, Math.round(sourceDimensions.height * cropAspectRatio)),
      height: sourceDimensions.height,
    };
  }

  return {
    width: sourceDimensions.width,
    height: Math.max(1, Math.round(sourceDimensions.width / cropAspectRatio)),
  };
}

function getOutputDimensionsForCanvas(canvas: HTMLCanvasElement | undefined): Dimensions {
  const sourceDimensions = getCaptureOutputDimensions();
  const previewDimensions = getCanvasDisplayDimensions(canvas);

  return getCroppedOutputDimensions(sourceDimensions, previewDimensions.width / previewDimensions.height);
}

function drawCroppedFrame(
  sourceCanvas: HTMLCanvasElement,
  targetContext: CanvasRenderingContext2D,
  targetDimensions: Dimensions,
) {
  try {
    const sourceWidth = sourceCanvas.width;
    const sourceHeight = sourceCanvas.height;
    const sourceAspectRatio = sourceWidth / sourceHeight;
    const targetAspectRatio = targetDimensions.width / targetDimensions.height;

    let sourceX = 0;
    let sourceY = 0;
    let cropWidth = sourceWidth;
    let cropHeight = sourceHeight;

    if (sourceAspectRatio > targetAspectRatio) {
      cropWidth = Math.round(sourceHeight * targetAspectRatio);
      sourceX = Math.round((sourceWidth - cropWidth) / 2);
    } else if (sourceAspectRatio < targetAspectRatio) {
      cropHeight = Math.round(sourceWidth / targetAspectRatio);
      sourceY = Math.round((sourceHeight - cropHeight) / 2);
    }

    targetContext.drawImage(
      sourceCanvas,
      sourceX,
      sourceY,
      cropWidth,
      cropHeight,
      0,
      0,
      targetDimensions.width,
      targetDimensions.height,
    );

    return true;
  } catch {
    return false;
  }
}

function createCroppedCanvas(sourceCanvas: HTMLCanvasElement, targetDimensions: Dimensions) {
  const targetCanvas = document.createElement("canvas");
  targetCanvas.width = targetDimensions.width;
  targetCanvas.height = targetDimensions.height;

  const context = targetCanvas.getContext("2d");

  if (!context || !drawCroppedFrame(sourceCanvas, context, targetDimensions)) {
    return null;
  }

  return targetCanvas;
}

function createImageBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve) => {
    try {
      canvas.toBlob((blob) => resolve(blob), "image/webp", IMAGE_QUALITY);
    } catch {
      resolve(null);
    }
  });
}

function createRecorder(stream: MediaStream) {
  if (MediaRecorder.isTypeSupported("video/webm")) {
    return new MediaRecorder(stream, { mimeType: "video/webm" });
  }

  return new MediaRecorder(stream);
}

export class CameraAppManager {
  isCapturing = $state(false);
  isRecording = $state(false);
  latestMedia = $state<SharedMediaAsset | null>(null);
  direction = $state<CameraDirection>("rear");
  canRecord = typeof MediaRecorder !== "undefined";

  private previewCanvas: HTMLCanvasElement | undefined;
  private previewGameView: GameView | null = null;
  private nativeCameraActive = false;
  private destroyed = false;
  private recorder: MediaRecorder | null = null;
  private recordingTimeout: number | undefined;
  private recordedChunks: Blob[] = [];
  private recordingCanvas: HTMLCanvasElement | null = null;
  private recordingGameView: GameView | null = null;
  private recordingFrame: number | undefined;

  mountPreview(canvas: HTMLCanvasElement | undefined) {
    if (!canvas) return;

    this.previewCanvas = canvas;
    this.destroyed = false;

    try {
      this.previewGameView = createGameView(this.previewCanvas);
      this.resizePreview();
      void this.openNativeCamera();
    } catch {
      this.previewGameView = null;
    }
  }

  resizePreview = () => {
    if (!this.previewCanvas || !this.previewGameView) return;

    const previewDimensions = getCanvasDisplayDimensions(this.previewCanvas);
    const { width, height } = calculateGameViewDimensions(previewDimensions.width, previewDimensions.height);

    this.previewGameView.resize(width, height);
  };

  takePhoto = async () => {
    if (this.isCapturing || this.isRecording) return;

    this.isCapturing = true;

    const sourceDimensions = getCaptureOutputDimensions();
    const captureDimensions = getOutputDimensionsForCanvas(this.previewCanvas);
    const canvas = document.createElement("canvas");
    canvas.width = sourceDimensions.width;
    canvas.height = sourceDimensions.height;

    let gameView: GameView | undefined;

    try {
      gameView = createGameView(canvas);
      gameView.resize(sourceDimensions.width, sourceDimensions.height);
      await waitForFrames(3);

      const outputCanvas = createCroppedCanvas(canvas, captureDimensions);

      if (!outputCanvas) {
        return;
      }

      const blob = await createImageBlob(outputCanvas);

      if (!blob) {
        return;
      }

      await this.uploadMedia("image", blob);
    } catch (e) {
      console.log("takePhoto error", e);
    } finally {
      gameView?.dispose();
      this.isCapturing = false;
    }
  };

  toggleRecording = () => {
    if (this.isRecording) {
      this.stopRecording();
      return;
    }

    void this.startRecording();
  };

  openLatestMedia = () => {
    phone.openApp("gallery");

    if (!this.latestMedia) {
      galleryApp.navigate("libary");
      return;
    }

    galleryApp.openMedia({
      id: this.latestMedia.id ?? this.latestMedia.url,
      url: this.latestMedia.url,
      type: this.latestMedia.type,
      alt: this.latestMedia.alt || (this.latestMedia.type === "video" ? "Recorded video" : "Gallery photo"),
    });
  };

  switchDirection = async () => {
    if (this.isCapturing || this.isRecording) return;

    try {
      const direction = await SendEvent<CameraDirection>("switchCameraDirection");

      if (this.destroyed) return;

      if (!direction) {
        return;
      }

      this.direction = direction || (this.direction === "rear" ? "front" : "rear");
      this.nativeCameraActive = true;
    } catch (e) {
      console.log("switchDirection error", e);
    }
  };

  destroy() {
    this.destroyed = true;
    window.clearTimeout(this.recordingTimeout);

    if (this.recorder && this.recorder.state !== "inactive") {
      this.recorder.stop();
    }

    this.stopRecordingFrameLoop();
    this.previewGameView?.dispose();
    this.previewGameView = null;
    this.previewCanvas = undefined;
    this.closeNativeCamera();
  }

  reset() {
    this.destroy();
    this.isCapturing = false;
    this.isRecording = false;
    this.latestMedia = null;
    this.direction = "rear";
    this.recordedChunks = [];
    this.recorder = null;
  }

  private async openNativeCamera() {
    try {
      const success = await SendEvent<boolean>("openCamera");

      if (this.destroyed) {
        void SendEvent<boolean>("closeCamera");
        return;
      }

      if (!success) {
        return;
      }

      this.direction = "rear";
      this.nativeCameraActive = true;
    } catch (e) {
      console.log("openNativeCamera error", e);
    }
  }

  private closeNativeCamera() {
    if (!this.nativeCameraActive) return;

    this.nativeCameraActive = false;
    void SendEvent<boolean>("closeCamera");
  }

  private stopRecording() {
    if (!this.recorder || this.recorder.state === "inactive") return;

    try {
      this.recorder.stop();
    } catch {
      this.isRecording = false;
    }
  }

  private async startRecording() {
    if (this.isCapturing || this.isRecording) return;

    if (!this.canRecord) {
      return;
    }

    if (!this.previewCanvas) {
      return;
    }

    const recordingSourceDimensions = getCaptureOutputDimensions();
    const recordingDimensions = getOutputDimensionsForCanvas(this.previewCanvas);
    const recordingSourceCanvas = document.createElement("canvas");
    const recordingCanvas = document.createElement("canvas");
    const recordingContext = recordingCanvas.getContext("2d");

    if (!recordingContext) {
      return;
    }

    recordingSourceCanvas.width = recordingSourceDimensions.width;
    recordingSourceCanvas.height = recordingSourceDimensions.height;
    recordingCanvas.width = recordingDimensions.width;
    recordingCanvas.height = recordingDimensions.height;

    try {
      this.recordingGameView = createGameView(recordingSourceCanvas);
      this.recordingGameView.resize(recordingSourceDimensions.width, recordingSourceDimensions.height);
    } catch {
      return;
    }

    const drawRecordingFrame = () => {
      if (!this.recordingGameView || this.recordingCanvas !== recordingCanvas) return;

      drawCroppedFrame(recordingSourceCanvas, recordingContext, recordingDimensions);
      this.recordingFrame = requestAnimationFrame(drawRecordingFrame);
    };

    this.recordingCanvas = recordingCanvas;
    drawRecordingFrame();

    this.recordedChunks = [];

    const stream = recordingCanvas.captureStream(VIDEO_FRAME_RATE);

    try {
      this.recorder = createRecorder(stream);
    } catch {
      this.stopRecordingFrameLoop();
      stream.getTracks().forEach((track) => track.stop());
      return;
    }

    this.recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.recorder.onerror = () => {
      this.isRecording = false;
    };

    this.recorder.onstop = async () => {
      window.clearTimeout(this.recordingTimeout);
      this.stopRecordingFrameLoop();
      stream.getTracks().forEach((track) => track.stop());
      this.isRecording = false;

      try {
        const blob = new Blob(this.recordedChunks, { type: this.recorder?.mimeType || "video/webm" });

        if (blob.size === 0) {
          return;
        }

        await this.uploadMedia("video", blob);
      } catch (e) {
        console.log("uploadMedia error", e);
      } finally {
        this.recorder = null;
        this.recordedChunks = [];
      }
    };

    this.recorder.start(500);
    this.isRecording = true;
    this.recordingTimeout = window.setTimeout(this.stopRecording.bind(this), MAX_RECORDING_MS);
  }

  private stopRecordingFrameLoop() {
    if (this.recordingFrame) {
      cancelAnimationFrame(this.recordingFrame);
      this.recordingFrame = undefined;
    }

    this.recordingGameView?.dispose();
    this.recordingGameView = null;
    this.recordingCanvas = null;
  }

  private async uploadMedia(type: SharedMediaAsset["type"], blob: Blob): Promise<boolean> {
    const cloudId = phone.cloudId;
    if (!cloudId) {
      return false;
    }

    const extension = type === "image" ? "webp" : "webm";
    const savedMedia = await persistMedia({
      cloudId,
      type,
      blob,
      extension,
      source: "camera",
    });

    if (!savedMedia) {
      return false;
    }

    this.latestMedia = {
      type: savedMedia.type,
      url: savedMedia.url,
      filename: savedMedia.filename,
      id: savedMedia.id,
      alt: savedMedia.filename,
    };

    return true;
  }
}

export const cameraApp = new CameraAppManager();
