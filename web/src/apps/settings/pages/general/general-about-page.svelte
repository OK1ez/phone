<script>
  import { ChevronLeft, ChevronRight } from "lucide-svelte";
  import { goBack } from "../../stores/settings";
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <button onclick={goBack} class="text-gray-400 hover:text-foreground">
    <ChevronLeft className="w-6 h-6" />
  </button>
  <p class="font-medium">About</p>
</header>

<div>
  <div class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 text-base">
    <p>Version</p>
    <p class="text-gray-400">1.0.0</p>
	</div>
  <div class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 text-base">
    <p>Serial number</p>
    <p class="text-gray-400">1234567890</p>
	</div>
</div>
