<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { cn } from "@/utils/misc";

  interface Props {
    checked?: boolean;
    disabled?: boolean;
    class?: string | undefined;
    [key: string]: any
  }

  let { checked = $bindable(false), disabled = false, class: className = undefined, ...rest }: Props = $props();
  

  const dispatch = createEventDispatcher();

  function toggle() {
    if (!disabled) {
      checked = !checked;
      dispatch("change", { checked });
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggle();
    }
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  {disabled}
  class={cn(
    "focus-visible:ring-ring focus-visible:ring-offset-background peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    checked ? "bg-primary" : "bg-input",
    className,
  )}
  onclick={toggle}
  onkeydown={handleKeyDown}
  {...rest}
>
  <span
    class={cn(
      "bg-background pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform",
      checked ? "translate-x-5" : "translate-x-0",
    )}
></span>
</button>
