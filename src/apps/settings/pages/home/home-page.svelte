<script>
	import { ScrollArea } from "@/components/ui/scroll-area";
  import Switch from "@/components/ui/switch/switch.svelte";
  import { AudioLines, BellDot, ChevronRight, Cloud, PlaneTakeoff, ScanFace, Settings, Video, Smartphone, Image } from "lucide-svelte";
  </script>

<header class="flex flex-col w-full pb-4 border-b">
	<div class="flex items-center justify-between w-full h-5 gap-4 px-6 mt-16">
		<p class="font-medium">Favorites</p>
	</div>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
	<button class="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
		<div class="flex items-center space-x-4">
			<Cloud />
			<div class="text-left">
				<p class="text-base">Cloud</p>
				<p class="text-sm text-gray-400">Save everything, even your digital junk drawer!</p>
			</div>
		</div>
		<ChevronRight class="w-4 h-4 text-gray-400" />
	</button>

	<div class="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
		<div class="flex items-center space-x-4">
			<PlaneTakeoff />
			<div class="text-left">
				<p class="text-base">Airplane mode</p>
				<p class="text-sm text-gray-400">Fake a flight and dodge distractions!</p>
			</div>
		</div>
		<Switch />
	</div>

	<div class="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
		<div class="flex items-center space-x-4">
			<Video />
			<div class="text-left">
				<p class="text-base">Streamer  mode</p>
				<p class="text-sm text-gray-400">Hides sensitive information</p>
			</div>
		</div>
		<Switch />
	</div>

	<button class="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
		<div class="flex items-center space-x-4">
			<Settings />
			<div class="text-left">
				<p class="text-base">General</p>
				<p class="text-sm text-gray-400">All the basic stuff that actually matters</p>
			</div>
		</div>
		<ChevronRight class="w-4 h-4 text-gray-400" />
	</button>

	<button class="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
		<div class="flex items-center space-x-4">
			<BellDot />
			<div class="text-left">
				<p class="text-base">Notifications</p>
				<p class="text-sm text-gray-400">Where chaos begins (or ends)</p>
			</div>
		</div>
		<ChevronRight class="w-4 h-4 text-gray-400" />
	</button>

	<button class="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
		<div class="flex items-center space-x-4">
			<AudioLines />
			<div class="text-left">
				<p class="text-base">Sounds</p>
				<p class="text-sm text-gray-400">Change ringtone and alerts</p>
			</div>
		</div>
		<ChevronRight class="w-4 h-4 text-gray-400" />
	</button>

	<button class="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
		<div class="flex items-center space-x-4">
			<ScanFace />
			<div class="text-left">
				<p class="text-base">Unlock</p>
				<p class="text-sm text-gray-400">Let your phone judge your face</p>
			</div>
		</div>
		<ChevronRight class="w-4 h-4 text-gray-400" />
	</button>

	<button class="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
		<div class="flex items-center space-x-4">
			<Smartphone />
			<div class="text-left">
				<p class="text-base">Display and brightness</p>
				<p class="text-sm text-gray-400">Adjust until you go blind, or it's perfect</p>
			</div>
		</div>
		<ChevronRight class="w-4 h-4 text-gray-400" />
	</button>

	<button class="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
		<div class="flex items-center space-x-4">
			<Image />
			<div class="text-left">
				<p class="text-base">Wallpapers</p>
				<p class="text-sm text-gray-400">Find the image that you'll change in 2 days</p>
			</div>
		</div>
		<ChevronRight class="w-4 h-4 text-gray-400" />
	</button>
</ScrollArea>