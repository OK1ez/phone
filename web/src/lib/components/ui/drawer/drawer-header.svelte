<script>
  let { class: className = "", children } = $props();
</script>

<div class="mb-3 flex flex-col space-y-1.5 text-start {className}">
  {@render children?.()}
</div>
