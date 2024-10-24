<script lang="ts">
  import { cn } from "@/utils/misc";
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string | undefined;
    children?: Snippet;
    [key: string]: any;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<div
  class={cn(
    "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
