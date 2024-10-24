<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "@/utils/misc";
  import type { Snippet } from 'svelte';

  interface Props {
    value: string;
    class?: string | undefined;
    children?: Snippet;
    [key: string]: any;
  }

  let { value, class: className = undefined, children, ...rest }: Props = $props();

  const { selectedTab } = getContext("tabs");
</script>

{#if $selectedTab === value}
  <div
    class={cn(
      "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      className,
    )}
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}
