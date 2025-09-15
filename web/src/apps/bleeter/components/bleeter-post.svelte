<script lang="ts">
  import { bleeterApp } from "../bleeter.svelte";
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

  function handleUsernameClick() {
    const profileData = {
      username: username,
      handle: `${username.toLowerCase()}`,
      avatar: avatar,
      verified: verified,
      bio: "This is a sample bio for the user profile.",
      followers: "12.5k",
      posts: [
        {
          avatar: avatar,
          username: username,
          verified: verified,
          timestamp: "1h",
          content: "This is a sample post from the user's profile.",
          likes: 123,
          comments: 45,
          reposts: 12,
        },
        {
          avatar: avatar,
          username: username,
          verified: verified,
          timestamp: "3h",
          content: "Another post from this user showing their activity.",
          likes: 89,
          comments: 23,
          reposts: 8,
        },
      ],
    };

    bleeterApp.openProfile(profileData);
  }

  let liked = $state(false);
  let reposted = $state(false);

  function handleLikeClick() {
    liked = !liked;
    likes = liked ? likes + 1 : likes - 1;
  }

  function handleRepostClick() {
    reposted = !reposted;
    reposts = reposted ? reposts + 1 : reposts - 1;
  }

  function handlePostClick() {
    const postData = {
      id: `post-${username}-${timestamp}`,
      avatar: avatar,
      username: username,
      verified: verified,
      timestamp: timestamp,
      content: content,
      likes: likes,
      comments: comments,
      reposts: reposts,
      replies: [
        {
          id: "reply-1",
          avatar:
            "https://static.wikia.nocookie.net/gtawiki/images/e/ec/Bleeter_GTAVpc_lonnie_fig3.png",
          username: "jane_doe",
          verified: false,
          timestamp: "2m",
          content:
            "This is a great point! I totally agree with your perspective on this.",
          likes: 12,
          comments: 2,
          reposts: 1,
        },
        {
          id: "reply-2",
          avatar:
            "https://static.wikia.nocookie.net/gtawiki/images/c/c0/Bleeter_GTAVpc_rockford_captain67.png",
          username: "tech_guru",
          verified: true,
          timestamp: "5m",
          content:
            "Interesting take. Have you considered the implications of this approach?",
          likes: 8,
          comments: 0,
          reposts: 3,
        },
        {
          id: "reply-3",
          avatar:
            "https://static.wikia.nocookie.net/gtawiki/images/e/ec/Bleeter_GTAVpc_lonnie_fig3.png",
          username: "developer_sam",
          verified: false,
          timestamp: "12m",
          content: "Thanks for sharing this! Really helpful insights.",
          likes: 5,
          comments: 1,
          reposts: 0,
        },
      ],
    };

    bleeterApp.openPostView(postData);
  }
</script>

<div
  class="w-full border-b px-6 py-4 space-x-4 flex hover:bg-secondary/20 cursor-pointer"
>
  <div class="max-h-8 max-w-8 min-w-8 min-h-8 overflow-hidden rounded-full">
    <img src={avatar} alt="avatar" class="w-full h-full object-cover" />
  </div>
  <div class="flex flex-col w-full space-y-1">
    <div class="flex justify-between items-center w-full">
      <div class="flex items-center space-x-0.5">
        <button
          class="text-sm font-medium hover:underline hover:cursor-pointer"
          onclick={(e) => {
            e.stopPropagation();
            handleUsernameClick();
          }}
        >
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
    <div class="flex items-center space-x-4 !mt-3">
      <button
        class="flex items-center space-x-2 w-16 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
        onclick={handleLikeClick}
      >
        <Heart
          size="14"
          class="group-hover:text-rose-500 transition-colors {liked &&
            'fill-rose-500 text-rose-500'}"
        />
        <span
          class="text-xs font-medium group-hover:text-rose-500 transition-colors {liked &&
            'text-rose-500'}"
        >
          {likes}
        </span>
      </button>
      <button
        class="flex items-center space-x-2 w-16 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
        onclick={handlePostClick}
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
        class="flex items-center space-x-2 w-16 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
        onclick={handleRepostClick}
      >
        <Repeat2
          size="18"
          class="group-hover:text-emerald-500 transition-colors {reposted &&
            'text-emerald-500'}"
        />
        <span
          class="text-xs font-medium group-hover:text-emerald-500 transition-colors {reposted &&
            'text-emerald-500'}"
        >
          {reposts}
        </span>
      </button>
    </div>
  </div>
</div>
