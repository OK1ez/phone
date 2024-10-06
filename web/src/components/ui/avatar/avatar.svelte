<script lang="ts">
  import { cn } from "@/utils/misc";

  let className: string | undefined = undefined;
  export { className as class };
</script>

<div
  on:click
  class={cn(
    "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
    className,
  )}
  {...$$restProps}
>
  <slot />
</div>
