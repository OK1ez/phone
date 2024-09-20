<script>
  import { ChevronLeft, ChevronRight } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { Switch } from "@/components/ui/switch";
  import { goBack, navigateTo } from "../../stores/settings";
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <button on:click={goBack} class="text-gray-400 hover:text-foreground">
    <ChevronLeft className="w-6 h-6" />
  </button>
  <p class="font-medium">General</p>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
	<button on:click={() => navigateTo("generalAbout")} class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
    <div class="flex items-center text-left">
      <p class="text-base">About</p>
    </div>
    <ChevronRight class="w-4 h-4 text-gray-400" />
	</button>
  <button class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
    <div class="flex items-center text-left">
      <p class="text-base">Software Updates</p>
    </div>
    <ChevronRight class="w-4 h-4 text-gray-400" />
	</button>
  <button class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
    <div class="flex items-center text-left">
      <p class="text-base">Air transfer</p>
    </div>
    <Switch />
	</button>
  <button class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
    <div class="flex items-center text-left">
      <p class="text-base">Reset Phone</p>
    </div>
    <ChevronRight class="w-4 h-4 text-gray-400" />
	</button>
</ScrollArea>