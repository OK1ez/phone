<script>
  let { children } = $props();
</script>

<div class="mt-auto flex flex-col gap-2">
  {@render children?.()}
</div>
