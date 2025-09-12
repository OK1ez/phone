<script>
  let { onclick } = $props();
</script>

<button
  class="absolute bottom-0 z-50 flex items-center justify-center w-full h-5 group outline-none focus:outline-none"
  aria-label="indicator"
  {onclick}
>
  <div
    class="bg-primary/60 w-32 rounded-full min-h-1 group-hover:bg-primary/80"
  ></div>
</button>
