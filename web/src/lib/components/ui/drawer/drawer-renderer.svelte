<script lang="ts">
  import { setDrawerRootContext, type DrawerInstance } from "./drawer-context.svelte";

  let { drawer }: { drawer: DrawerInstance } = $props();

  function close() {
    drawer.close();
  }

  function toggle() {
    if (drawer.open) {
      drawer.close();
      return;
    }

    drawer.open = true;
  }

  setDrawerRootContext({
    get drawer() {
      return drawer;
    },
    setOpen(value: boolean) {
      if (value) {
        drawer.open = true;
        return;
      }

      drawer.close();
    },
    toggle,
    close,
  });
</script>

{#if drawer.content}
  {@render drawer.content()}
{/if}
