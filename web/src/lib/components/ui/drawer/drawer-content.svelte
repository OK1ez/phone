<script lang="ts">
  import { onDestroy, type Snippet } from "svelte";

  import { getDrawerRootContext } from "./drawer-context.svelte";

  let { class: className = "", children } = $props<{
    class?: string;
    children?: Snippet;
  }>();

  const drawer = getDrawerRootContext();

  $effect(() => {
    drawer.drawer.content = children;
    drawer.drawer.className = className;
  });

  onDestroy(() => {
    drawer.drawer.content = undefined;
    drawer.drawer.className = "";
  });
</script>
