<script lang="ts">
  import { writable } from "svelte/store";
  import { setContext, createEventDispatcher } from "svelte";

  export let value: string;

  const dispatch = createEventDispatcher();
  const selectedTab = writable(value);

  $: selectedTab.set(value);

  setContext("tabs", {
    registerTab: (tabValue: string) => {
      return {
        select: () => {
          dispatch("change", tabValue);
        },
      };
    },
    selectedTab,
  });
</script>

<div {...$$restProps}>
  <slot />
</div>
