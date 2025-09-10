import type { DebugAction } from "../../types/events";
import { DebugEventSend, SendEvent } from "../eventsHandlers";

const InitDebug: DebugAction[] = [
  {
    label: "Visible",
    action: () => DebugEventSend("setVisibility", true),
    delay: 500,
  },
  {
    label: "Open Bank",
    action: () => DebugEventSend("openBank", {}),
    delay: 1000,
  },
];

export function InitialiseDebugSenders(): void {
  for (const debug of InitDebug) {
    setTimeout(() => {
      debug.action();
    }, debug.delay || 0);
  }
}

export default InitDebug;
