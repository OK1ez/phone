<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "@/utils/misc";

  export let value: string;
  let className: string | undefined = undefined;
  export { className as class };

  const { registerTab, selectedTab } = getContext("tabs");
  const { select } = registerTab(value);
</script>

<button
  class={cn(
    "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
    className,
  )}
  data-state={$selectedTab === value ? "active" : "inactive"}
  on:click={select}
  {...$$restProps}
>
  <slot />
</button>
