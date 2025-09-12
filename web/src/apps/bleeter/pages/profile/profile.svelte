<script>
  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import BadgeCheck from "lucide-svelte/icons/badge-check";
  import MoreHorizontal from "lucide-svelte/icons/more-horizontal";
  import MessageSquare from "lucide-svelte/icons/message-square";
  import Repeat2 from "lucide-svelte/icons/repeat-2";
  import Heart from "lucide-svelte/icons/heart";

  let isOwnProfile = $state(true);
  let isFollowing = $state(false);
</script>

{#if !isOwnProfile}
  <button
    class="flex items-center w-full space-x-2 mt-[4.5rem] px-6 pb-4 border-b"
  >
    <ChevronLeft class="size-5 text-muted-foreground hover:text-foreground" />
    <p class="font-medium text-sm">Back</p>
  </button>
{/if}

<div
  class="flex flex-col w-full overflow-y-auto {isOwnProfile
    ? 'mt-[4.5rem] h-[calc(100%-9.4rem)]'
    : 'pt-5 h-[calc(100%-11.6rem)]'}"
>
  <div class="px-6 pb-5 border-b">
    <div class="flex justify-between">
      <div class="flex flex-col">
        <div class="flex items-center space-x-0.5">
          <h1 class="text-base font-bold">OKiez</h1>
          <BadgeCheck class="size-[1.1rem] text-background" fill="#60a5fa" />
        </div>
        <span class="text-xs text-muted-foreground">ok1ez</span>
      </div>
      <img
        src="https://static.wikia.nocookie.net/gtawiki/images/c/c0/Bleeter_GTAVpc_rockford_captain67.png"
        alt="avatar"
        class="size-12 rounded-full object-cover"
      />
    </div>
    <p class="text-xs mt-3">
      Occaecat irure magna irure dolor ipsum aliquip Lorem commodo.
    </p>
    <p class="text-xs text-muted-foreground mt-3">25k Followers</p>
    {#if !isOwnProfile}
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
    {:else}
      <button
        class="bg-input/30 hover:bg-input/50 border h-7 w-full text-xs font-medium rounded-md disabled:opacity-50 focus-visible:border-ring/20 mt-4"
      >
        Edit Profile
      </button>
    {/if}
  </div>

  <div class="w-full">
    <div class="w-full border-b px-6 py-4 space-x-4 flex hover:bg-secondary/20">
      <div class="max-h-9 max-w-9 min-w-9 min-h-9 overflow-hidden rounded-full">
        <img
          src="https://static.wikia.nocookie.net/gtawiki/images/c/c0/Bleeter_GTAVpc_rockford_captain67.png"
          alt="avatar"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="flex flex-col w-full space-y-1">
        <div class="flex justify-between items-center w-full">
          <div class="flex items-center space-x-0.5">
            <span
              class="text-sm font-medium hover:underline hover:cursor-pointer"
            >
              OKiez
            </span>
            <BadgeCheck class="size-[1.1rem] text-background" fill="#60a5fa" />
            <span class="text-muted-foreground text-xs">2h</span>
          </div>
          <button class="text-muted-foreground hover:text-foreground">
            <MoreHorizontal class="size-4" />
          </button>
        </div>
        <p class="text-xs leading-relaxed">
          Cillum esse minim proident. Esse aliquip occaecat cupidatat consequat
          est aute est enim culpa ullamco id aliqua.
        </p>
        <div class="flex items-center justify-between !mt-3">
          <button
            class="flex items-center space-x-2 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
          >
            <Heart
              size="14"
              class="group-hover:text-rose-500 transition-colors"
            />
            <span
              class="text-xs font-medium group-hover:text-rose-500 transition-colors"
            >
              24
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
              422
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
              422
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
