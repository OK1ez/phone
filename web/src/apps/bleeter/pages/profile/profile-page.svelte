<script lang="ts">
  import { ChevronLeft, Pen } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import * as Avatar from "@/components/ui/avatar";
  import Button from "@/components/ui/button/button.svelte";
  import Bleet from "../../components/bleet/bleet.svelte";
  import { SendEvent } from "@/utils/eventsHandlers";
  import { onMount } from "svelte";
  import { LOGGED_IN_AS, SELECTED_USER } from "../../stores/bleeter";

  export let isOverlay = false;

  let profile = {};
  let bleets = [];

  $: username = isOverlay ? $SELECTED_USER : $LOGGED_IN_AS;

  $: {
    if (username) {
      loadProfile(username);
    }
  }

  async function loadProfile(username) {
    profile = await SendEvent("bleeter:fetchProfile", username);
    bleets = await SendEvent("bleeter:fetchFromUsername", username);
  }

  function closeOverlay() {
    if (isOverlay) {
      SELECTED_USER.set(null);
    }
  }
</script>

{#if isOverlay}
  <header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
    <button on:click={closeOverlay}>
      <ChevronLeft class="w-6 h-6 text-gray-400 hover:text-foreground" />
    </button>
  </header>
{/if}

<ScrollArea class="flex flex-col w-full h-full max-h-[56rem] overflow-y-auto">
  {#if profile.username}
    <div class="relative">
      <img
        src={profile.banner}
        alt="Profile banner"
        class="object-cover w-full h-40"
      />
      <div class="absolute inset-0 bg-black/40" />
      <div class="absolute flex items-end justify-between w-full px-4 -mt-6">
        <Avatar.Root class="w-20 h-20 border-4 border-background">
          <Avatar.Image src={profile.avatar} alt={`@${profile.username}`} />
          <Avatar.Fallback>{profile?.displayName?.[0] ?? ""}</Avatar.Fallback>
        </Avatar.Root>
        {#if $LOGGED_IN_AS === profile.username}
          <Button variant="outline" class="rounded-full">
            <Pen class="w-4 h-4 mr-2" />
            Edit profile
          </Button>
        {:else}
          <Button class="px-4 rounded-full">Follow</Button>
        {/if}
      </div>
    </div>
    <div class="p-6 pt-0 mt-16 border-b">
      <h1 class="text-xl font-bold">{profile.displayName}</h1>
      <p class="text-gray-400">@{profile.username}</p>
      <p class="mt-2">{profile.bio}</p>
      <div class="flex gap-4 mt-2">
        <button>
          <span class="font-bold">{profile.followersCount}</span>
          <span class="text-gray-400">Following</span>
        </button>
        <button>
          <span class="font-bold">{profile.followingCount}</span>
          <span class="text-gray-400">Followers</span>
        </button>
      </div>
    </div>
  {/if}
  {#if bleets}
    {#each bleets as bleet}
      <Bleet {bleet} />
    {/each}
  {/if}
</ScrollArea>
