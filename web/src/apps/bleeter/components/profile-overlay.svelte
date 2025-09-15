<script lang="ts">
  import { bleeterApp } from "../bleeter.svelte";
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import BadgeCheck from "@lucide/svelte/icons/badge-check";
  import BleeterPost from "./bleeter-post.svelte";
  import { fly, scale } from "svelte/transition";

  interface ProfileData {
    username: string;
    handle: string;
    avatar: string;
    verified: boolean;
    bio: string;
    followers: string;
    posts: Array<{
      avatar: string;
      username: string;
      verified: boolean;
      timestamp: string;
      content: string;
      likes: number;
      comments: number;
      reposts: number;
    }>;
  }

  let { profileData }: { profileData: ProfileData } = $props();

  let isFollowing = $state(false);

  function closeProfile() {
    bleeterApp.closeProfile();
  }
</script>

<div
  class="absolute top-0 left-0 w-full h-[calc(100%-4.9rem)] bg-background z-10 flex flex-col"
  in:fly={{ x: 300, duration: 300 }}
  out:fly={{ x: 300, duration: 300 }}
>
  <button class="flex items-center w-full space-x-2 mt-[4.5rem] px-6 pb-4 border-b" onclick={closeProfile}>
    <ChevronLeft class="size-5 text-muted-foreground hover:text-foreground" />
    <p class="font-medium text-sm">Back</p>
  </button>

  <div class="flex flex-col w-full overflow-y-auto pt-5 flex-1">
    <div class="px-6 pb-5 border-b">
      <div class="flex justify-between">
        <div class="flex flex-col">
          <div class="flex items-center space-x-0.5">
            <h1 class="text-base font-bold">{profileData.username}</h1>
            {#if profileData.verified}
              <BadgeCheck class="size-[1.1rem] text-background" fill="#60a5fa" />
            {/if}
          </div>
          <span class="text-xs text-muted-foreground">{profileData.handle}</span>
        </div>
        <img src={profileData.avatar} alt="avatar" class="size-12 rounded-full object-cover" />
      </div>
      <p class="text-xs mt-3">
        {profileData.bio}
      </p>
      <p class="text-xs text-muted-foreground mt-3">
        {profileData.followers} Followers
      </p>

      {#if !isFollowing}
        <button
          class="bg-primary/85 hover:bg-primary/90 text-primary-foreground h-7 w-full text-xs font-medium rounded-md disabled:opacity-50 focus-visible:border-ring/20 mt-4"
          onclick={() => (isFollowing = true)}
        >
          Follow
        </button>
      {:else}
        <button
          class="bg-input/30 hover:bg-input/50 border h-7 w-full text-xs font-medium rounded-md disabled:opacity-50 focus-visible:border-ring/20 mt-4"
          onclick={() => (isFollowing = false)}
        >
          Following
        </button>
      {/if}
    </div>

    <div class="w-full">
      {#each profileData.posts as post}
        <BleeterPost
          avatar={post.avatar}
          username={post.username}
          verified={post.verified}
          timestamp={post.timestamp}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
          reposts={post.reposts}
        />
        <BleeterPost
          avatar={post.avatar}
          username={post.username}
          verified={post.verified}
          timestamp={post.timestamp}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
          reposts={post.reposts}
        />
        <BleeterPost
          avatar={post.avatar}
          username={post.username}
          verified={post.verified}
          timestamp={post.timestamp}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
          reposts={post.reposts}
        />
      {/each}
    </div>
  </div>
</div>
