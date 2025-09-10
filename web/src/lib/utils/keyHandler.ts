import { SendEvent } from "@/lib/utils/eventsHandlers";
import { phone } from "@/lib/states/phone.svelte";

export function setupKeyHandler() {
  const keyHandler = (e: KeyboardEvent) => {
    if (e.code === "Escape" && phone.visible) {
      SendEvent("hide");
      phone.visible = false;
    }
  };

  window.addEventListener("keydown", keyHandler);
  return () => window.removeEventListener("keydown", keyHandler);
}
