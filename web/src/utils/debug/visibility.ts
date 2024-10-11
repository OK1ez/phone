import { IS_LOCKED } from "@/stores/phone";
import { VISIBLE } from "@/stores/stores";
/**
 * The debug response for the visibility debug action.
 */
export function toggleVisible(state: boolean): void {
  VISIBLE.set(state ? "visible" : "hidden");
  if (!state) {
    IS_LOCKED.set(true);
  }
}
