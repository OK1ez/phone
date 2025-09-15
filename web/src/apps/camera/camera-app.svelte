<script>
  import Zap from "@lucide/svelte/icons/zap";
  import Settings from "@lucide/svelte/icons/settings";
  import Images from "@lucide/svelte/icons/images";
  import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";
  import Camera from "@lucide/svelte/icons/camera";
</script>

<div class="flex flex-col w-full h-full bg-background">
  <header class="flex items-center justify-between w-full mt-[4.5rem] px-6 pb-4 border-b">
    <button>
      <Zap class="size-5 text-muted-foreground hover:text-foreground" />
    </button>

    <button>
      <Settings class="size-5 text-muted-foreground hover:text-foreground" />
    </button>
  </header>
  <div class="flex flex-1">
    <img
      src="https://r2.fivemanage.com/Yl9OcgxACkrz1IbRcV7P2/Skjermbilde2025-09-15105912.png"
      alt=""
      class="object-cover"
    />
  </div>
  <footer class="border-t w-full flex items-center justify-between mt-auto px-6 pb-12 pt-6">
    <button>
      <Images class="size-5 text-muted-foreground hover:text-foreground" />
    </button>
    <button class="size-14 rounded-full flex items-center justify-center group bg-primary/90" aria-label="Take photo">
      <div class="size-12 rounded-full bg-background flex items-center justify-center">
        <div class="size-11 rounded-full bg-primary/90 hover:bg-primary/70"></div>
      </div>
    </button>
    <button>
      <RefreshCcw class="size-5 text-muted-foreground hover:text-foreground" />
    </button>
  </footer>
</div>
