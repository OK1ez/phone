<script>
  let { class: className = "", children } = $props();
</script>

<div class="flex flex-row justify-end space-x-2 {className}">
  {@render children?.()}
</div>
