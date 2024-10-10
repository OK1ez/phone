import { VISIBLE } from "@/stores/stores";
/**
 * The debug response for the visibility debug action.
 */
export function toggleVisible(state: boolean): void {
  VISIBLE.set(state ? "visible" : "hidden");
}
