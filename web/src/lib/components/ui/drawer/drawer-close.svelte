<script lang="ts">
  import { getDrawerRootContext } from "./drawer-context.svelte";

  let { class: className = "", children } = $props();

  const drawer = getDrawerRootContext();

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    drawer.close();
  }
</script>

<span
  class="inline-flex cursor-pointer {className}"
  role="button"
  tabindex="0"
  onclick={drawer.close}
  onkeydown={handleKeydown}
>
  {@render children?.()}
</span>
