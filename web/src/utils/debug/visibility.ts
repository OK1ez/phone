import { DebugEventSend } from "@/utils/eventsHandlers";
/**
 * The debug response for the visibility debug action.
 */
export function toggleVisible(visible: boolean): void {
  DebugEventSend("resource:visible", visible);
}
