<script>
  let { class: className = "", children } = $props();
</script>

<p class="text-muted-foreground text-sm wrap-break-word {className}">
  {@render children?.()}
</p>
