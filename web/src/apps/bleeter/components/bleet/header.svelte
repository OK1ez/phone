<script lang="ts">
  import {
    BadgeCheck,
    MoreHorizontal,
    Trash2,
    UserPlus,
    Flag,
  } from "lucide-svelte";
</script>

<div class="flex justify-between w-full">
  <div class="flex items-center">
    <p class="text-base font-medium cursor-pointer hover:underline">OKiez</p>
    <BadgeCheck
      fill="#60a5fa"
      class="w-5 h-5 ml-1 text-background"
      strokeWidth={2}
    />
    <p class="ml-1 text-sm text-gray-400">@okiez · 4h</p>
  </div>
  <!-- <p class="text-sm text-gray-400">Ad</p> -->

  <button class="text-gray-400 hover:text-foreground">
    <MoreHorizontal class="w-5 h-5" />
  </button>
</div>
