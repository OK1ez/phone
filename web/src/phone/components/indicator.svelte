<script lang="ts">
  let { onclick }: { onclick?: () => void } = $props();
</script>

<button
  class="absolute bottom-0 z-50 flex items-center justify-center w-full h-5 group outline-hidden focus:outline-hidden"
  aria-label="indicator"
  {onclick}
>
  <div class="bg-primary/60 w-28 rounded-full min-h-1 group-hover:bg-primary/80"></div>
</button>
