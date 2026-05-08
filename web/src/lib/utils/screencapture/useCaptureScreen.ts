import { createGameView, resizeGameView } from "./gameview";
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

    try {
      resizeGameView(gameView, [window.innerWidth, window.innerHeight]);

      // TODO: Use innerWidth and innerHeight from the game view unless the user has specified a custom size
      // TODO: Option to choose between base64 and blob
      // TODO: Option for quality and encoding type
      return await createBlob(canvas);
    } finally {
      gameView.dispose();

      if (localCanvas) {
        canvas.remove();
      }
    }
  };

  return { capture };
};
