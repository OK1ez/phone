<script lang="ts">
  import { Heart, MessageSquare, Repeat2 } from "lucide-svelte";

  export let bleet: any;

  function likeBleet(event: MouseEvent) {
    event.stopPropagation();
    bleet.likes++;
  }

  function rebleetBleet(event: MouseEvent) {
    event.stopPropagation();
    bleet.rebleets++;
  }
</script>

<div class="flex gap-8 mt-4">
  <button
    class="flex items-center w-16 text-gray-400 group"
    aria-label="Comment"
  >
    <MessageSquare
      size="20"
      class="group-hover:fill-blue-400 group-hover:text-blue-400"
    />
    <span class="ml-2">{bleet.comments}</span>
  </button>
  <button
    on:click={rebleetBleet}
    class="flex items-center w-16 text-gray-400 group"
    aria-label="Rebleet"
  >
    <Repeat2
      size="20"
      class="group-hover:fill-emerald-500 group-hover:text-emerald-500"
    />
    <span class="ml-2">{bleet.rebleets}</span>
  </button>
  <button
    on:click={likeBleet}
    class="flex items-center w-16 text-gray-400 group"
    aria-label="Like"
  >
    <Heart
      size="20"
      class="group-hover:fill-rose-500 group-hover:text-rose-500"
    />
    <span class="ml-2">{bleet.likes}</span>
  </button>
</div>
