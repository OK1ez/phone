import { VISIBLE } from "@/stores/stores";
/**
 * The debug response for the visibility debug action.
 */
export function toggleVisible(visible: boolean): void {
  VISIBLE.set(visible);
}
