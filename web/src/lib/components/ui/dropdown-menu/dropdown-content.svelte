<script lang="ts">
  import { fly } from "svelte/transition";

  let { class: className = "", children, context } = $props();
</script>

{#if context.isOpen}
  <div
    transition:fly={{ duration: 200 }}
    class="fixed right-0 z-50 overflow-hidden rounded-md border p-1 mt-1 shadow-md outline-hidden bg-popover text-popover-foreground min-w-32 whitespace-nowrap {className}"
  >
    {@render children?.(context)}
  </div>
{/if}
