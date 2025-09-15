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
    <button>
      <Camera class="size-5 text-muted-foreground hover:text-foreground" />
    </button>
    <button>
      <RefreshCcw class="size-5 text-muted-foreground hover:text-foreground" />
    </button>
  </footer>
</div>
