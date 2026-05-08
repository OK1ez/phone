<script>
  let { class: className = "", children } = $props();
</script>

<p class="text-muted-foreground text-xs {className}">
  {@render children?.()}
</p>
