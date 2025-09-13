<script lang="ts">
  import BadgeCheck from "lucide-svelte/icons/badge-check";
  import MoreHorizontal from "lucide-svelte/icons/more-horizontal";
  import MessageSquare from "lucide-svelte/icons/message-square";
  import Repeat2 from "lucide-svelte/icons/repeat-2";
  import Heart from "lucide-svelte/icons/heart";

  let {
    avatar,
    username,
    verified = false,
    timestamp,
    content,
    likes,
    comments,
    reposts,
  }: {
    avatar: string;
    username: string;
    verified?: boolean;
    timestamp: string;
    content: string;
    likes: number;
    comments: number;
    reposts: number;
  } = $props();
</script>

<div class="w-full border-b px-6 py-4 space-x-4 flex hover:bg-secondary/20">
  <div class="max-h-9 max-w-9 min-w-9 min-h-9 overflow-hidden rounded-full">
    <img src={avatar} alt="avatar" class="w-full h-full object-cover" />
  </div>
  <div class="flex flex-col w-full space-y-1">
    <div class="flex justify-between items-center w-full">
      <div class="flex items-center space-x-0.5">
        <span class="text-sm font-medium hover:underline hover:cursor-pointer">
          {username}
        </span>
        {#if verified}
          <BadgeCheck class="size-[1.1rem] text-background" fill="#60a5fa" />
        {/if}
        <span class="text-muted-foreground text-xs">{timestamp}</span>
      </div>
      <button class="text-muted-foreground hover:text-foreground">
        <MoreHorizontal class="size-4" />
      </button>
    </div>
    <p class="text-xs leading-relaxed">
      {content}
    </p>
    <div class="flex items-center justify-between !mt-3">
      <button
        class="flex items-center space-x-2 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
      >
        <Heart size="14" class="group-hover:text-rose-500 transition-colors" />
        <span
          class="text-xs font-medium group-hover:text-rose-500 transition-colors"
        >
          {likes}
        </span>
      </button>
      <button
        class="flex items-center space-x-2 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
      >
        <MessageSquare
          size="15"
          class="group-hover:text-blue-500 transition-colors"
        />
        <span
          class="text-xs font-medium group-hover:text-blue-500 transition-colors"
        >
          {comments}
        </span>
      </button>
      <button
        class="flex items-center space-x-2 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
      >
        <Repeat2
          size="18"
          class="group-hover:text-emerald-500 transition-colors"
        />
        <span
          class="text-xs font-medium group-hover:text-emerald-500 transition-colors"
        >
          {reposts}
        </span>
      </button>
    </div>
  </div>
</div>
