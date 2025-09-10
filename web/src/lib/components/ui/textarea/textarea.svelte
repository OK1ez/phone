<script lang="ts">
  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className = "",
    ...restProps
  } = $props();
</script>

<textarea
  bind:this={ref}
  class="border-input bg-background placeholder:text-muted-foreground flex min-h-[80px] max-h-[20rem] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 {className}"
  bind:value
  {...restProps}
></textarea>
