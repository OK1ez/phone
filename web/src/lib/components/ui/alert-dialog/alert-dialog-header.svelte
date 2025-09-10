<script>
  let { class: className = "", children } = $props();
</script>

<div class="flex flex-col space-y-2 text-left {className}">
  {@render children?.()}
</div>
