<script>
  import BadgeCheck from "lucide-svelte/icons/badge-check";
  import MoreHorizontal from "lucide-svelte/icons/more-horizontal";
  import MessageSquare from "lucide-svelte/icons/message-square";
  import Repeat2 from "lucide-svelte/icons/repeat-2";
  import Heart from "lucide-svelte/icons/heart";

  let activeTab = $state("for-you");
</script>

<header
  class="flex items-center justify-center w-full mt-[4.5rem] px-6 space-x-12 border-b"
>
  <button
    class="border-b-2 w-[5rem] text-xs font-medium pb-2 {activeTab === 'for-you'
      ? 'border-primary'
      : 'border-transparent text-muted-foreground hover:text-foreground'}"
    onclick={() => (activeTab = "for-you")}
  >
    For You
  </button>
  <button
    class="border-b-2 w-[5rem] text-xs font-medium pb-2 {activeTab ===
    'following'
      ? 'border-primary'
      : 'border-transparent text-muted-foreground hover:text-foreground'}"
    onclick={() => (activeTab = "following")}
  >
    Following
  </button>
</header>

<div class="flex flex-col w-full h-[calc(100%-11.8rem)] overflow-y-auto">
  <div class="w-full border-b px-6 py-4 space-x-4 flex hover:bg-secondary/20">
    <img
      src="https://static.wikia.nocookie.net/gtawiki/images/c/c0/Bleeter_GTAVpc_rockford_captain67.png"
      alt="avatar"
      class="size-9 rounded-full"
    />
    <div class="flex flex-col w-full space-y-0.5">
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center space-x-0.5">
          <span
            class="text-sm font-medium hover:underline hover:cursor-pointer"
          >
            OKiez
          </span>
          <BadgeCheck class="size-[1.1rem] text-background" fill="#60a5fa" />
          <!-- <span class="text-muted-foreground text-xs">@ok1ez</span> -->
        </div>
        <button class="text-muted-foreground hover:text-foreground">
          <MoreHorizontal class="size-4" />
        </button>
      </div>
      <p class="text-sm">
        Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you?
        Hey, how are you? Hey, how are you? Hey, how are you?
      </p>
      <!-- <div class="flex space-x-2 pt-2">
        <button
          class="flex items-center w-16 text-muted-foreground group space-x-2"
        >
          <MessageSquare class="size-4" />
          <span class="text-sm">422</span>
        </button>
        <button
          class="flex items-center w-16 text-muted-foreground group space-x-2"
        >
          <Repeat2 class="size-4" />
          <span class="text-sm">7</span>
        </button>
        <button
          class="flex items-center w-16 text-muted-foreground group space-x-2"
        >
          <Heart class="size-4" />
          <span class="text-sm">24</span>
        </button>
      </div> -->
    </div>
  </div>
</div>
