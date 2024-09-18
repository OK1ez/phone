<script>
  import { Heart, MessageSquare, Repeat2 } from "lucide-svelte";
</script>

<div class="flex gap-8 mt-4">
  <button class="flex items-center w-16 text-gray-400 hover:text-blue-400">
    <MessageSquare size={20} />
    <span class="ml-2">45</span>
  </button>
  <button class="flex items-center w-16 text-gray-400 hover:text-emerald-500">
    <Repeat2 size={20} />
    <span class="ml-2">25</span>
  </button>
  <button class="flex items-center w-16 text-gray-400 hover:text-rose-600">
    <Heart size={20} />
    <span class="ml-2">52</span>
  </button>
</div>