interface Window {
  GetParentResourceName?: () => string;
  invokeNative?: boolean;
}

declare const window: Window;

export class App {
  resourceName = $state(
    window.GetParentResourceName ? window.GetParentResourceName() : "interface",
  );
  isBrowser = $state(!window.invokeNative);
}

export const app = new App();
