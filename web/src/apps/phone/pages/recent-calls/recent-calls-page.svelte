<script>
  import { InfoIcon } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
</script>
    
<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <p class="font-medium">Recent calls</p>
</header>
    
<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  <div class="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
    <p class="text-base text-red-500">OKiez</p>
    <div class="flex items-center space-x-4">
      <p class="text-sm text-gray-400">17:53</p>
      <div class="cursor-pointer">
        <InfoIcon class="w-4 h-4 text-gray-400 hover:text-foreground" />
      </div>
    </div>
  </div>
  <div class="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
    <p class="text-base">OKiez</p>
    <div class="flex items-center space-x-4">
      <p class="text-sm text-gray-400">Yesterday</p>
      <div class="cursor-pointer">
        <InfoIcon class="w-4 h-4 text-gray-400 hover:text-foreground" />
      </div>
    </div>
  </div>
  <div class="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
    <p class="text-base">Mads</p>
    <div class="flex items-center space-x-4">
      <p class="text-sm text-gray-400">2 days ago</p>
      <div class="cursor-pointer">
        <InfoIcon class="w-4 h-4 text-gray-400 hover:text-foreground" />
      </div>
    </div>
  </div>
  <div class="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
    <p class="text-base">John</p>
    <div class="flex items-center space-x-4">
      <p class="text-sm text-gray-400">1 week ago</p>
      <div class="cursor-pointer">
        <InfoIcon class="w-4 h-4 text-gray-400 hover:text-foreground" />
      </div>
    </div>
  </div>
</ScrollArea>