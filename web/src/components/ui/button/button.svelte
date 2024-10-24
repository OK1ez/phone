<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import { type Events, type Props, buttonVariants } from "./index.js";
  import { cn } from "@/utils/misc";

  type $$Props = Props;
  type $$Events = Events;

  interface Props_1 {
    class?: $$Props["class"];
    variant?: $$Props["variant"];
    size?: $$Props["size"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let {
    class: className = undefined,
    variant = "default",
    size = "default",
    children,
    onkeydown,
    onclick,
    ...rest
  }: Props_1 = $props();

</script>

<button
  class={cn(buttonVariants({ variant, size, className }))}
  type="button"
  {...rest}
  {onclick}
  {onkeydown}
>
  {@render children?.()}
</button>
