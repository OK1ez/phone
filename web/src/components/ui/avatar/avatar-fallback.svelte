<script lang="ts">
  import { cn } from "@/utils/misc";

  interface Props {
    class?: string | undefined;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<div
  class={cn(
    "bg-muted flex h-full w-full items-center justify-center rounded-full",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
