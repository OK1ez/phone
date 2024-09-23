<script>
  import { ScrollArea } from "@/components/ui/scroll-area";
  import * as Avatar from "@/components/ui/avatar";
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
	<p class="font-medium">Notifications</p>
</header>
  
<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  <div class="flex items-center w-full h-16 gap-4 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
    <Avatar.Root>
      <Avatar.Image src="https://github.com/ok1ez.png" alt="@okiez" />
      <Avatar.Fallback>O</Avatar.Fallback>
    </Avatar.Root>
    <span>OKiez started following you</span>
  </div>
  <div class="flex items-center w-full h-16 gap-4 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
    <Avatar.Root>
      <Avatar.Image src="https://github.com/madsleander.png" alt="@okiez" />
      <Avatar.Fallback>M</Avatar.Fallback>
    </Avatar.Root>
    <span>Mads liked your post</span>
  </div>
</ScrollArea>