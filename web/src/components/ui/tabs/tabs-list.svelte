<script lang="ts">
  import { cn } from "@/utils/misc";

  let className: string | undefined = undefined;
  export { className as class };
</script>

<div
  class={cn(
    "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
    className,
  )}
  {...$$restProps}
>
  <slot />
</div>
