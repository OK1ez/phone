<script lang="ts">
  import { fly } from "svelte/transition";
  import { ChevronLeft } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import Bleet from "../../components/bleet/bleet.svelte";
  import { SELECTED_BLEET } from "../../stores/bleeter";

  function closeBleet() {
    SELECTED_BLEET.set(null);
  }
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <button on:click={closeBleet}>
    <ChevronLeft class="w-6 h-6 text-gray-400 hover:text-foreground" />
  </button>
  <h1 class="text-xl font-bold">Bleet</h1>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[56rem] overflow-y-auto">
  {#if $SELECTED_BLEET}
    <!-- Todo: fix this ui -->
    <Bleet bleet={$SELECTED_BLEET} />

    <div class=" border-t">
      <h2 class="mb-4 text-lg font-semibold">Create a comment</h2>
    </div>

    <div class="p-4 border-t">
      <h2 class="mb-4 text-lg font-semibold">Comments</h2>
    </div>
  {/if}
</ScrollArea>
