<script lang="ts">
  import { ChevronLeft, Pen } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import * as Avatar from "@/components/ui/avatar";
  import Button from "@/components/ui/button/button.svelte";
  import Bleet from "../../components/bleet/bleet.svelte";
  import { SendEvent } from "@/utils/eventsHandlers";
  import { onMount } from "svelte";
  import { LOGGED_IN_AS } from "../../stores/bleeter";

  let profile = {};
  let bleets = [];

  onMount(async () => {
    // fetch profile by username
    profile = {
      username: "okiez",
      displayName: "OKiez",
      avatar: "https://github.com/ok1ez.png",
      banner: "https://sumeetdas.me/Bleeter/img/banners/bleeter_banner.jpg",
      bio: "Super cool bio",
      verified: true,
      followersCount: 420,
      followingCount: 69,
    };

    // fetch bleets from username, fetch 15 latest and on scroll fetch more
    bleets = await SendEvent("bleeter:fetchFromUsername", profile.username);
  });
</script>

<ScrollArea class="flex flex-col w-full h-full max-h-[56rem] overflow-y-auto">
  {#if profile}
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
