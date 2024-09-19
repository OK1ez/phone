<script lang="ts">
  import { ChevronLeft, Pen } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import * as Avatar from "@/components/ui/avatar";
  import Button from "@/components/ui/button/button.svelte";
  import Bleet from "../../components/bleet/bleet.svelte";

  let hasBackButton = false
  let isOwnProfile = false
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  {#if hasBackButton}
    <button class="text-gray-400 hover:text-foreground">
      <ChevronLeft className="w-6 h-6" />
    </button>
  {/if}
  <p class="font-medium">Profile</p>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  <div class="relative">
    <img src="https://sumeetdas.me/Bleeter/img/banners/bleeter_banner.jpg" alt="Profile banner" class="object-cover w-full h-32" />
    <div class="absolute flex items-end justify-between w-full px-4 -mt-6">
      <Avatar.Root class="w-20 h-20 border-4 border-background">
        <Avatar.Image src="https://github.com/ok1ez.png" alt="@okiez" />
        <Avatar.Fallback>O</Avatar.Fallback>
      </Avatar.Root>
      {#if isOwnProfile}
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
    <h1 class="text-xl font-bold">OKiez</h1>
    <p class="text-gray-400">@okiez</p>
    <p class="mt-2">Super cool bio</p>
    <div class="flex gap-4 mt-2">
      <button>
        <span class="font-bold">69</span> <span class="text-gray-400">Following</span>
      </button>
      <button>
        <span class="font-bold">420</span> <span class="text-gray-400">Followers</span>
      </button>
    </div>
  </div>

  <Bleet />
  <Bleet />
  <Bleet />
  <Bleet />
  <Bleet />
</ScrollArea>