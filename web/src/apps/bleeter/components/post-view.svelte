<script lang="ts">
  import { bleeterApp } from "../bleeter.svelte";
  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import BadgeCheck from "lucide-svelte/icons/badge-check";
  import MoreHorizontal from "lucide-svelte/icons/more-horizontal";
  import MessageSquare from "lucide-svelte/icons/message-square";
  import Repeat2 from "lucide-svelte/icons/repeat-2";
  import Heart from "lucide-svelte/icons/heart";
  import Send from "lucide-svelte/icons/send";
  import Images from "lucide-svelte/icons/images";
  import { fly } from "svelte/transition";
  import BleeterReply from "./bleeter-reply.svelte";

  interface PostData {
    id: string;
    avatar: string;
    username: string;
    verified: boolean;
    timestamp: string;
    content: string;
    likes: number;
    comments: number;
    reposts: number;
    replies: Array<{
      id: string;
      avatar: string;
      username: string;
      verified: boolean;
      timestamp: string;
      content: string;
      likes: number;
      comments: number;
      reposts: number;
      liked?: boolean;
    }>;
  }

  let { postData }: { postData: PostData } = $props();

  let liked = $state(false);
  let reposted = $state(false);

  function closePostView() {
    bleeterApp.closePostView();
  }

  let replyText = $state("");
  let textareaRef: HTMLTextAreaElement | null = null;

  function autoResize() {
    if (textareaRef) {
      textareaRef.style.height = "1.5rem";
      const maxHeight = 120;
      const newHeight = Math.min(textareaRef.scrollHeight, maxHeight);
      textareaRef.style.height = `${newHeight}px`;
    }
  }
</script>

<div
  class="absolute top-0 left-0 w-full h-[calc(100%-4.9rem)] bg-background z-10 flex flex-col"
  in:fly={{ x: 300, duration: 300 }}
  out:fly={{ x: 300, duration: 300 }}
>
  <button
    class="flex items-center w-full space-x-2 mt-[4.5rem] px-6 pb-4 border-b"
    onclick={closePostView}
  >
    <ChevronLeft class="size-5 text-muted-foreground hover:text-foreground" />
    <p class="font-medium text-sm">Back</p>
  </button>

  <div class="flex flex-col w-full overflow-y-auto flex-1">
    <div class="w-full border-b px-6 py-4 flex-col space-y-2">
      <div class="flex items-center space-x-4">
        <div
          class="max-h-8 max-w-8 min-w-8 min-h-8 overflow-hidden rounded-full"
        >
          <img
            src={postData.avatar}
            alt="avatar"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex items-center space-x-0.5">
          <button
            class="text-sm font-medium hover:underline hover:cursor-pointer"
          >
            {postData.username}
          </button>
          {#if postData.verified}
            <BadgeCheck class="size-[1.1rem] text-background" fill="#60a5fa" />
          {/if}
          <span
            class="text-muted-foreground text-xs {!postData.verified &&
              '!ml-1'}"
          >
            {postData.timestamp}
          </span>
        </div>
      </div>
      <p class="text-xs leading-relaxed">
        {postData.content}
      </p>
      <div class="flex items-center space-x-4 pt-2">
        <button
          class="flex items-center space-x-2 w-16 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
        >
          <Heart
            size="14"
            class="group-hover:text-rose-500 transition-colors {liked &&
              'fill-rose-500 text-rose-500'}"
          />
          <span
            class="text-xs font-medium group-hover:text-rose-500 transition-colors"
          >
            {postData.likes}
          </span>
        </button>
        <button
          class="flex items-center space-x-2 w-16 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
        >
          <MessageSquare
            size="15"
            class="group-hover:text-blue-500 transition-colors"
          />
          <span
            class="text-xs font-medium group-hover:text-blue-500 transition-colors"
          >
            {postData.comments}
          </span>
        </button>
        <button
          class="flex items-center space-x-2 w-16 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
        >
          <Repeat2
            size="18"
            class="group-hover:text-emerald-500 transition-colors {reposted &&
              'text-emerald-500'}"
          />
          <span
            class="text-xs font-medium group-hover:text-emerald-500 transition-colors"
          >
            {postData.reposts}
          </span>
        </button>
      </div>
    </div>

    <div class="px-6 py-4 border-b">
      <textarea
        bind:this={textareaRef}
        bind:value={replyText}
        oninput={autoResize}
        placeholder="Reply to OKiez"
        class="w-full bg-transparent h-6 placeholder:text-muted-foreground border-none outline-none resize-none text-sm max-h-[120px] overflow-y-auto"
      ></textarea>
      <div class="flex justify-between">
        <button class="text-muted-foreground hover:text-foreground">
          <Images class="size-5" />
        </button>
        <button
          class="bg-primary/85 hover:bg-primary/90 text-primary-foreground h-7 px-3 text-xs font-medium rounded-md disabled:opacity-50 focus-visible:border-ring/20"
          disabled
        >
          Send
        </button>
      </div>
    </div>

    <div class="w-full">
      {#if postData.replies.length > 0}
        {#each postData.replies as reply}
          <BleeterReply
            avatar={reply.avatar}
            username={reply.username}
            verified={reply.verified}
            timestamp={reply.timestamp}
            content={reply.content}
            likes={reply.likes}
          />
        {/each}
      {/if}
    </div>
  </div>
</div>
