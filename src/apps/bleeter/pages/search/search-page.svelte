<script>
  import { Search } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import * as Avatar from "@/components/ui/avatar";
</script>

<header class="flex flex-col w-full pb-4 border-b">
  <div class="flex items-center justify-between w-full h-12 gap-4 px-6 mt-16">
    <div class="flex items-center w-full h-12 gap-2 px-4 text-lg font-medium transition-all rounded-full bg-secondary dark:bg-secondary/30">
    <Search class="text-gray-400" />
    <input 
      type="text" 
      placeholder="Search"
      class="font-normal bg-transparent min-w-14 focus:outline-none" 
    />
    </div>
  </div>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  <div class="flex items-center w-full h-16 gap-4 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
    <Avatar.Root>
      <Avatar.Image src="https://github.com/ok1ez.png" alt="@okiez" />
      <Avatar.Fallback>O</Avatar.Fallback>
    </Avatar.Root>
    <span>OKiez</span>
  </div>
</ScrollArea>