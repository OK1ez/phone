<script lang="ts">
  import { cn } from "@/utils/misc";

  let className: string | undefined = undefined;
  export { className as class };
</script>

<div
  class={cn(
    "bg-muted flex h-full w-full items-center justify-center rounded-full",
    className,
  )}
  {...$$restProps}
>
  <slot />
</div>
