<script lang="ts">
  import { bleeterApp } from "./bleeter.svelte";
  import ProfileOverlay from "./components/profile-overlay.svelte";
  import PostView from "./components/post-view.svelte";

  import Home from "lucide-svelte/icons/home";
  import Search from "lucide-svelte/icons/search";
  import BellDot from "lucide-svelte/icons/bell-dot";
  import User from "lucide-svelte/icons/user";
  import Plus from "lucide-svelte/icons/plus";

  let CurrentRoute = $derived(bleeterApp.routes[bleeterApp.currentRoute].route);
</script>

<div class=" flex flex-col w-full h-full bg-background">
  {#key bleeterApp.currentRoute}
    <div class="w-full h-full absolute">
      <CurrentRoute />
    </div>
  {/key}
  {#if bleeterApp.profileOverlay.isOpen && bleeterApp.profileOverlay.profileData}
    <ProfileOverlay profileData={bleeterApp.profileOverlay.profileData} />
  {/if}
  {#if bleeterApp.postView.isOpen && bleeterApp.postView.postData}
    <PostView postData={bleeterApp.postView.postData} />
  {/if}
  <div
    class="absolute bottom-0 flex items-center justify-center space-x-3 w-full h-20 px-12 pb-4 border-t bg-background z-30"
  >
    <button
      class="p-4 {bleeterApp.currentRoute === 'home'
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'}"
      onclick={() => bleeterApp.navigate("home")}
    >
      <Home class="size-5" />
    </button>
    <button
      class="p-4 {bleeterApp.currentRoute === 'search'
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'}"
      onclick={() => bleeterApp.navigate("search")}
    >
      <Search class="size-5" />
    </button>
    <button class="p-4 text-muted-foreground hover:text-foreground">
      <Plus class="size-5" />
    </button>
    <button
      class="p-4 {bleeterApp.currentRoute === 'notifications'
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'}"
      onclick={() => bleeterApp.navigate("notifications")}
    >
      <BellDot class="size-5" />
    </button>
    <button
      class="p-4 {bleeterApp.currentRoute === 'profile'
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'}"
      onclick={() => bleeterApp.navigate("profile")}
    >
      <User class="size-5" />
    </button>
  </div>
</div>
