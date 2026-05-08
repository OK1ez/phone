<script>
  let { class: className = "", children } = $props();
</script>

<div class="mt-3 flex flex-row gap-2 {className}">
  {@render children?.()}
</div>
