<script lang="ts">
  import { cn } from "@/utils/misc";

  interface Props {
    class?: string | undefined;
    src?: string | undefined;
    alt?: string | undefined;
    [key: string]: any
  }

  let { class: className = undefined, src = undefined, alt = undefined, ...rest }: Props = $props();
  
</script>

<img
  {src}
  {alt}
  class={cn("aspect-square h-full w-full", className)}
  {...rest}
/>
