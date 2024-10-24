<script lang="ts">
  import { cn } from "@/utils/misc";

  interface Props {
    class?: string | undefined;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { onclick, class: className = undefined, children, ...rest }: Props = $props();

</script>

<div
  {onclick}
  class={cn(
    "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
