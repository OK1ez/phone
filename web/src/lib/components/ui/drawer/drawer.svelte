<script lang="ts">
  import { DrawerInstance, registerDrawer, setDrawerRootContext } from "./drawer-context.svelte";

  let { open = $bindable(false), children } = $props();

  const id = `drawer-${Math.random().toString(36).slice(2, 11)}`;
  const drawer = new DrawerInstance(id, open);
  registerDrawer(drawer);

  function close() {
    open = false;
    drawer.open = false;
  }

  function toggle() {
    open = !open;
    drawer.open = open;
  }

  drawer.close = close;

  setDrawerRootContext({
    drawer,
    setOpen(value: boolean) {
      open = value;
      drawer.open = value;
    },
    toggle,
    close,
  });

  $effect(() => {
    drawer.open = open;
  });
</script>

{@render children?.()}
