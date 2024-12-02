<script lang="ts">
  import { fly } from "svelte/transition";
  let { open = $bindable(false), class: className, children } = $props();
</script>

{#if open}
  <div
    class="absolute inset-x-0 bottom-0 flex flex-col rounded-t-xl border-t bg-background pb-12 px-6 gap-4 {className}"
    transition:fly={{ y: 500, duration: 300 }}
  >
    <button onclick={() => (open = false)} class="w-full pt-4 pb-2 mb-2">
      <div class="mx-auto h-2 w-[100px] rounded-full bg-muted"></div>
    </button>
    {@render children?.()}
  </div>
{/if}
