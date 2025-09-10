import { phone } from "@/lib/states/phone.svelte";
import type { DebugEventCallback } from "../types/events";
import { ReceiveEvent } from "./eventsHandlers";

import { setClipboard } from "./utils";

const AlwaysListened: DebugEventCallback[] = [
  {
    action: "test",
    handler: (data: any) => {},
  },
];

export function InitialiseListeners() {
  for (const debug of AlwaysListened) {
    if (debug.handler) {
      ReceiveEvent(debug.action, debug.handler);
    }
  }
}

export default AlwaysListened;
