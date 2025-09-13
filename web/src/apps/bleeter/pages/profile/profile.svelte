<script>
  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import BadgeCheck from "lucide-svelte/icons/badge-check";
  import BleeterPost from "../../components/bleeter-post.svelte";

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
    <BleeterPost
      avatar="https://static.wikia.nocookie.net/gtawiki/images/c/c0/Bleeter_GTAVpc_rockford_captain67.png"
      username="OKiez"
      verified={true}
      timestamp="2h"
      content="Cillum esse minim proident. Esse aliquip occaecat cupidatat consequat est aute est enim culpa ullamco id aliqua."
      likes={750}
      comments={422}
      reposts={422}
    />
    <BleeterPost
      avatar="https://static.wikia.nocookie.net/gtawiki/images/e/ec/Bleeter_GTAVpc_lonnie_fig3.png"
      username="Zoo"
      verified={true}
      timestamp="4h"
      content="Cillum esse minim proident."
      likes={533}
      comments={234}
      reposts={120}
    />
  </div>
</div>
