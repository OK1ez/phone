<script lang="ts">
  import { bleeterApp } from "../bleeter.svelte";
  import BadgeCheck from "@lucide/svelte/icons/badge-check";
  import MoreHorizontal from "@lucide/svelte/icons/more-horizontal";
  import Heart from "@lucide/svelte/icons/heart";

  let {
    avatar,
    username,
    verified = false,
    timestamp,
    content,
    likes,
  }: {
    avatar: string;
    username: string;
    verified?: boolean;
    timestamp: string;
    content: string;
    likes: number;
  } = $props();

  let liked = $state(false);

  function handleLikeClick() {
    liked = !liked;
    likes = liked ? likes + 1 : likes - 1;
  }
</script>

<div class="w-full border-b px-6 py-4 space-x-4 flex hover:bg-secondary/20">
  <div class="max-h-8 max-w-8 min-w-8 min-h-8 overflow-hidden rounded-full">
    <img src={avatar} alt="avatar" class="w-full h-full object-cover" />
  </div>
  <div class="flex flex-col w-full space-y-1">
    <div class="flex justify-between items-center w-full">
      <div class="flex items-center space-x-0.5">
        <button class="text-sm font-medium hover:underline hover:cursor-pointer">
          {username}
        </button>
        {#if verified}
          <BadgeCheck class="size-[1.1rem] text-background" fill="#60a5fa" />
        {/if}
        <span class="text-muted-foreground text-xs {!verified && '!ml-1'}">
          {timestamp}
        </span>
      </div>
      <button class="text-muted-foreground hover:text-foreground">
        <MoreHorizontal class="size-4" />
      </button>
    </div>
    <p class="text-xs leading-relaxed">
      {content}
    </p>
    <div class="flex items-center !mt-3">
      <button
        class="flex items-center space-x-2 w-16 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
        onclick={handleLikeClick}
      >
        <Heart size="14" class="group-hover:text-rose-500 transition-colors {liked && 'fill-rose-500 text-rose-500'}" />
        <span class="text-xs font-medium group-hover:text-rose-500 transition-colors {liked && 'text-rose-500'}">
          {likes}
        </span>
      </button>
    </div>
  </div>
</div>
