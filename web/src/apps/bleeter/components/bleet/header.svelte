<script lang="ts">
  import { SELECTED_USER } from "../../stores/bleeter";
  import {
    BadgeCheck,
    MoreHorizontal,
    Trash2,
    UserPlus,
    Flag,
  } from "lucide-svelte";

  interface Props {
    bleet: any;
    selectUser: (event: MouseEvent) => void;
  }

  let { bleet, selectUser }: Props = $props();
</script>

<div class="flex justify-between w-full">
  <div class="flex items-center">
    <p
      class="text-base font-medium cursor-pointer hover:underline"
      onclick={selectUser}
    >
      {bleet.displayName}
    </p>
    {#if bleet.verified}
      <BadgeCheck
        fill="#60a5fa"
        class="w-5 h-5 ml-1 text-background"
        strokeWidth={2}
      />
    {/if}
    <p class="ml-1 text-sm text-gray-400">
      @{bleet.username} · {bleet.timestamp}
    </p>
  </div>

  <button class="text-gray-400 hover:text-foreground">
    <MoreHorizontal class="w-5 h-5" />
  </button>
</div>
