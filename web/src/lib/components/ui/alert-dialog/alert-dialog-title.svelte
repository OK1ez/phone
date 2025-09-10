<script>
  let { class: className = "", children } = $props();
</script>

<h1 class="text-lg font-semibold {className}">
  {@render children?.()}
</h1>
