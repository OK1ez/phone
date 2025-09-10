<script lang="ts">
  let { class: className = "", children, context } = $props();
</script>

<button class={className} onclick={() => context.toggle()}>
  {@render children?.()}
</button>
