export type GameViewSize = {
  width: number;
  height: number;
};

export type GameViewResizeInput = GameViewSize | [number, number];

export type GameView = {
  canvas: HTMLCanvasElement;
  dispose: () => void;
  resize: (width: number, height: number) => void;
};

type NativeGameViewInstance = {
  destroy?: () => void;
  dispose?: () => void;
  resize?: (width: number, height: number) => void;
  setBounds?: (width: number, height: number) => void;
  setSize?: (width: number, height: number) => void;
};

type NativeGameViewConstructor = new (canvas: HTMLCanvasElement) => NativeGameViewInstance;

type NativeGameViewFactory = {
  create?: (canvas: HTMLCanvasElement) => NativeGameViewInstance;
};

type NativeGameViewGlobal =
  | NativeGameViewConstructor
  | NativeGameViewFactory
  | undefined;

declare global {
  interface Window {
    CfxGameViewRenderer?: NativeGameViewGlobal;
  }
}

function normalizeSize(width: number, height: number): GameViewSize {
  return {
    width: Math.max(1, Math.floor(width)),
    height: Math.max(1, Math.floor(height)),
  };
}

function createNativeGameViewInstance(canvas: HTMLCanvasElement) {
  const renderer = window.CfxGameViewRenderer;

  if (!renderer) {
    throw new Error("CfxGameViewRenderer is unavailable in this NUI context");
  }

  if (typeof renderer === "function") {
    return new renderer(canvas);
  }

  if (typeof renderer.create === "function") {
    return renderer.create(canvas);
  }

  throw new Error("CfxGameViewRenderer does not expose a supported constructor or factory");
}

export function createGameView(canvas: HTMLCanvasElement): GameView {
  const instance = createNativeGameViewInstance(canvas);

  return {
    canvas,
    dispose: () => {
      instance.dispose?.();
      instance.destroy?.();
    },
    resize: (width: number, height: number) => {
      const size = normalizeSize(width, height);
      canvas.width = size.width;
      canvas.height = size.height;
      instance.resize?.(size.width, size.height);
      instance.setSize?.(size.width, size.height);
      instance.setBounds?.(size.width, size.height);
    },
  };
}

export function resizeGameView(gameView: GameView, size: GameViewResizeInput) {
  if (Array.isArray(size)) {
    gameView.resize(size[0], size[1]);
    return;
  }

  gameView.resize(size.width, size.height);
}
