import type { DebugAction } from "$lib/types/events";
import { DebugEventSend } from "../eventsHandlers";

/**
 * The initial debug actions to run on startup
 */
const InitDebug: DebugAction[] = [
  {
    label: "Open Phone",
    action: () => DebugEventSend("openPhone", { phoneId: 3, cloudId: 1 }),
    delay: 500,
  },
];

export default InitDebug;

export function InitialiseDebugSenders(): void {
  for (const debug of InitDebug) {
    setTimeout(() => {
      debug.action();
    }, debug.delay || 0);
  }
}
