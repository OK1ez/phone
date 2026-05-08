<script>
  let { class: className = "", children } = $props();
</script>

<h2 class="text-foreground text-sm font-medium leading-none {className}">
  {@render children?.()}
</h2>
