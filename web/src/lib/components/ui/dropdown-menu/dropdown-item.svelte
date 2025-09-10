<script lang="ts">
  let { class: className, children, onclick, context } = $props();

  function select() {
    if (onclick) onclick();
    context.isOpen = false;
  }
</script>

<button
  class="relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-secondary hover:text-secondary-foreground w-full {className}"
  onclick={select}
>
  {@render children?.()}
</button>
