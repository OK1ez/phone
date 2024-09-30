<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "@/utils/misc";

  export let value: string;
  let className: string | undefined = undefined;
  export { className as class };

  const { selectedTab } = getContext("tabs");
</script>

{#if $selectedTab === value}
  <div
    class={cn(
      "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      className,
    )}
    {...$$restProps}
  >
    <slot />
  </div>
{/if}
