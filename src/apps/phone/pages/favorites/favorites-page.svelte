<script>
	import { InfoIcon } from "lucide-svelte";
	import { ScrollArea } from "@/components/ui/scroll-area";
	import * as Avatar from "@/components/ui/avatar";
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <p class="font-medium">Favorites</p>
</header>
		
<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
	<div class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
		<div class="flex items-center space-x-4">
      <Avatar.Root>
        <Avatar.Image src="https://github.com/ok1ez.png" alt="@okiez" />
        <Avatar.Fallback>O</Avatar.Fallback>
      </Avatar.Root>
			<p class="text-base">OKiez</p>
		</div>
		<button>
			<InfoIcon class="w-4 h-4 text-gray-400 hover:text-foreground" />
		</button>
	</div>
	<div class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
		<div class="flex items-center space-x-4">
      <Avatar.Root>
        <Avatar.Image src="https://github.com/madsleander.png" alt="@madsleander" />
        <Avatar.Fallback>M</Avatar.Fallback>
      </Avatar.Root>
			<p class="text-base">Mads</p>
		</div>
		<button>
			<InfoIcon class="w-4 h-4 text-gray-400 hover:text-foreground" />
		</button>
	</div>
</ScrollArea>