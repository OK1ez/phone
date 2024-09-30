<script lang="ts">
  import { cn } from "@/utils/misc";

  let className: string | undefined = undefined;
  export let src: string | undefined = undefined;
  export let alt: string | undefined = undefined;
  export { className as class };
</script>

<img
  {src}
  {alt}
  class={cn("aspect-square h-full w-full", className)}
  {...$$restProps}
/>
