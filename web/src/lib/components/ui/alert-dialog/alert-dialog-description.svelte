<script>
  let { class: className = "", children } = $props();
</script>

<p class="text-muted-foreground text-sm break-words {className}">
  {@render children?.()}
</p>
