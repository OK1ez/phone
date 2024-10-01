<script lang="ts">
  import { Heart, MessageSquare, Repeat2 } from "lucide-svelte";

  export let bleet: any;
</script>

<div class="flex gap-8 mt-4">
  <button class="flex items-center w-16 text-gray-400 hover:text-blue-400">
    <MessageSquare size={20} />
    <span class="ml-2">{bleet.comments}</span>
  </button>
  <button class="flex items-center w-16 text-gray-400 hover:text-emerald-500">
    <Repeat2 size={20} />
    <span class="ml-2">{bleet.rebleets}</span>
  </button>
  <button class="flex items-center w-16 text-gray-400 hover:text-rose-600">
    <Heart size={20} />
    <span class="ml-2">{bleet.likes}</span>
  </button>
</div>
