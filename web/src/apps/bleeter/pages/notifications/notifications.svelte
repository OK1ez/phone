<script lang="ts">
  import { bleeterApp } from "../../bleeter.svelte";

  function openProfile(
    username: string,
    avatar: string,
    verified: boolean = false,
  ) {
    const profileData = {
      username: username,
      handle: `${username.toLowerCase()}`,
      avatar: avatar,
      verified: verified,
      bio: `This is ${username}'s profile bio.`,
      followers: "8.2k",
      posts: [
        {
          avatar: avatar,
          username: username,
          verified: verified,
          timestamp: "2h",
          content: "Sample post content from this user's profile.",
          likes: 156,
          comments: 42,
          reposts: 18,
        },
      ],
    };
    bleeterApp.openProfile(profileData);
  }
</script>

<header class="flex items-center w-full mt-[4.5rem] px-6 pb-4 border-b">
  <p class="font-medium text-sm">Notifications</p>
</header>

<div class="flex flex-col w-full h-[calc(100%-11.7rem)] overflow-y-auto">
  <div
    class="flex items-center justify-between w-full min-h-14 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left group"
  >
    <div class="flex items-center space-x-3">
      <button
        onclick={() =>
          openProfile(
            "Zoo",
            "https://static.wikia.nocookie.net/gtawiki/images/e/ec/Bleeter_GTAVpc_lonnie_fig3.png",
          )}
      >
        <img
          src="https://static.wikia.nocookie.net/gtawiki/images/e/ec/Bleeter_GTAVpc_lonnie_fig3.png"
          alt="avatar"
          class="size-8 rounded-full hover:opacity-80"
        />
      </button>
      <span class="text-xs">
        <button
          class="hover:underline font-medium"
          onclick={() =>
            openProfile(
              "Zoo",
              "https://static.wikia.nocookie.net/gtawiki/images/e/ec/Bleeter_GTAVpc_lonnie_fig3.png",
            )}
        >
          Zoo
        </button>
        liked your post
      </span>
    </div>
    <span class="text-xs text-muted-foreground">1h</span>
  </div>
  <div
    class="flex items-center justify-between w-full min-h-14 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left group"
  >
    <div class="flex items-center space-x-3">
      <button
        onclick={() =>
          openProfile(
            "OKiez",
            "https://static.wikia.nocookie.net/gtawiki/images/c/c0/Bleeter_GTAVpc_rockford_captain67.png",
            true,
          )}
      >
        <img
          src="https://static.wikia.nocookie.net/gtawiki/images/c/c0/Bleeter_GTAVpc_rockford_captain67.png"
          alt="avatar"
          class="size-8 rounded-full hover:opacity-80"
        />
      </button>
      <span class="text-xs">
        <button
          class="hover:underline font-medium"
          onclick={() =>
            openProfile(
              "OKiez",
              "https://static.wikia.nocookie.net/gtawiki/images/c/c0/Bleeter_GTAVpc_rockford_captain67.png",
              true,
            )}
        >
          OKiez
        </button>
        commented on your post
      </span>
    </div>
    <span class="text-xs text-muted-foreground">3h</span>
  </div>
  <div
    class="flex items-center justify-between w-full min-h-14 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left group"
  >
    <div class="flex items-center space-x-3">
      <button
        onclick={() =>
          openProfile(
            "Quasar",
            "https://static.wikia.nocookie.net/gtawiki/images/4/46/Bleeter_GTAVpc_tacobrendan_who.png",
          )}
      >
        <img
          src="https://static.wikia.nocookie.net/gtawiki/images/4/46/Bleeter_GTAVpc_tacobrendan_who.png"
          alt="avatar"
          class="size-8 rounded-full hover:opacity-80"
        />
      </button>
      <span class="text-xs">
        <button
          class="hover:underline font-medium"
          onclick={() =>
            openProfile(
              "Quasar",
              "https://static.wikia.nocookie.net/gtawiki/images/4/46/Bleeter_GTAVpc_tacobrendan_who.png",
            )}
        >
          Quasar
        </button>
        resold your project
      </span>
    </div>
    <span class="text-xs text-muted-foreground">7h</span>
  </div>
</div>
