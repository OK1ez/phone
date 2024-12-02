<script>
  let { children } = $props();
</script>

<div class="grid gap-1.5 text-left">
  {@render children?.()}
</div>
