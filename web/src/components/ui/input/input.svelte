<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { InputEvents } from "./index.js";
  import { cn } from "src/utils/misc.js";

  type $$Props = HTMLInputAttributes;
  type $$Events = InputEvents;

  // Workaround for https://github.com/sveltejs/svelte/issues/9305
  // Fixed in Svelte 5, but not backported to 4.x.
  interface Props {
    class?: $$Props["class"];
    value?: $$Props["value"];
    readonly?: $$Props["readonly"];
    [key: string]: any;
  }

  let {
    class: className = undefined,
    value = $bindable(undefined),
    readonly = undefined,
    ...rest
  }: Props = $props();
</script>

<input
  class={cn(
    "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    className,
  )}
  bind:value
  {readonly}
  {...rest}
/>
