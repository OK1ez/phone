import { SendEvent } from "@/lib/utils/eventsHandlers";
import { core } from "@/lib/states/core.svelte";

export function setupKeyHandler() {
  const keyHandler = (e: KeyboardEvent) => {
    if (e.code === "Escape" && core.visible) {
      SendEvent("hide");
      core.visible = false;
    }
  };

  window.addEventListener("keydown", keyHandler);
  return () => window.removeEventListener("keydown", keyHandler);
}
