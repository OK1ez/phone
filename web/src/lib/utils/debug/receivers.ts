import type { DebugEventCallback } from "../../types/events";
import { DebugEventReceive } from "../eventsHandlers";
import { locales } from "./data";

const ReceiveDebuggers: DebugEventCallback[] = [
  {
    action: "hide",
    handler: () => {
      console.log("closed");
    },
  },

  {
    action: "fetchLocales",
    handler: () => {
      console.log("[DEBUG] Fetching locales");
      return locales;
    },
  },
];

export function InitialiseDebugReceivers(): void {
  for (const debug of ReceiveDebuggers) {
    DebugEventReceive(debug.action, debug.handler);
  }
}

export default ReceiveDebuggers;
