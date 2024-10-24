<script lang="ts">
  import { setContext, createEventDispatcher } from "svelte";
  import type { Snippet } from 'svelte';

  interface Props {
    value: string;
    children?: Snippet;
    [key: string]: any;
  }

  let { value, children, ...rest }: Props = $props();
  let selectedTab = $state(value);

  $effect(() => {
    selectedTab = value;
  });

  const dispatch = createEventDispatcher();

  const selectedTabStore = {
    subscribe: (fn: (value: string) => void) => {
      fn(selectedTab);

      const effectCleanup = $effect.root(() => {
        $effect(() => {
          fn(selectedTab);
        });
      });

      return () => {
        if (effectCleanup) effectCleanup();
      };
    }
  };

  setContext("tabs", {
    registerTab: (tabValue: string) => {
      return {
        select: () => {
          dispatch("change", tabValue);
        },
      };
    },
    selectedTab: selectedTabStore
  });
</script>


<div {...rest}>
  {@render children?.()}
</div>
