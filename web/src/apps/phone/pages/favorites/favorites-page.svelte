<script>
  import { InfoIcon } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import * as Avatar from "@/components/ui/avatar";
  import { onMount } from "svelte";
  import { SendEvent } from "@/utils/eventsHandlers";

  let favorites = [];

  onMount(async () => {
    favorites = await SendEvent("phone:fetchFavorites", {});
  });
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <p class="font-medium">Favorites</p>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  {#each favorites as favorite}
    <div
      class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer"
    >
      <div class="flex items-center space-x-4">
        <Avatar.Root>
          <Avatar.Image src={favorite.avatar} alt={favorite.name} />
          <Avatar.Fallback>{favorite.name[0]}</Avatar.Fallback>
        </Avatar.Root>
        <p class="text-base">{favorite.name}</p>
      </div>
      <button>
        <InfoIcon class="w-4 h-4 text-gray-400 hover:text-foreground" />
      </button>
    </div>
  {/each}
</ScrollArea>
