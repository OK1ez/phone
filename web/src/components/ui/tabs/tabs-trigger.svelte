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

  const { registerTab, selectedTab } = getContext("tabs");
  const { select } = registerTab(value);
</script>

<button
  class={cn(
    "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
    className,
  )}
  data-state={$selectedTab === value ? "active" : "inactive"}
  onclick={select}
  {...rest}
>
  {@render children?.()}
</button>
