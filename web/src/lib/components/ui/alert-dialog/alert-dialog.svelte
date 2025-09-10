<script lang="ts">
  let { open = $bindable(false), class: className = "", children } = $props();
</script>

{#if open}
  <div class="fixed inset-0 z-50">
    <div
      onclick={() => (open = false)}
      class="fixed inset-0 bg-background/40 backdrop-blur-sm rounded-lg"
    ></div>

    <div
      class="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg rounded-lg max-w-[25rem] {className}"
    >
      {@render children?.()}
    </div>
  </div>
{/if}
