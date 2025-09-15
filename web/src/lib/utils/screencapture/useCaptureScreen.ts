import { createGameView } from "@screencapture/gameview";
import { createBlob } from "./utils";

export const useCaptureScreen = () => {
  const capture = async (canvas: HTMLCanvasElement) => {
    let localCanvas = false;
    if (!canvas) {
      localCanvas = true;
      canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const gameView = createGameView(canvas);

    // TODO: Use innerWidth and innerHeight from the game view unless the user has specified a custom size
    gameView.resize(window.innerWidth, window.innerHeight);

    // TODO: Option to choose between base64 and blob
    // TODO: Option for quality and encoding type
    const blob = await createBlob(canvas);

    if (!blob) {
      console.error("No blob available");
      return;
    }

    if (localCanvas) {
      canvas.remove();
    }

    return blob;
  };

  return { capture };
};
