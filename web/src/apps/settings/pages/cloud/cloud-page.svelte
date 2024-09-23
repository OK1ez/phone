<script>
  import { onMount } from "svelte";
  import { ChevronLeft, Cloud, LogOut } from "lucide-svelte";
  import { goBack, navigateTo } from "../../stores/settings";

  let loggedIn = true;

  onMount(() => {
    if (!loggedIn) {
      navigateTo("cloudLogin");
    }
  });

  function handleLogout() {
    // Implement logout logic here
    loggedIn = false;
    navigateTo("cloudLogin");
  }
</script>

<!-- Todo: maybe new design? -->

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <button on:click={goBack} class="text-gray-400 hover:text-foreground">
    <ChevronLeft className="w-6 h-6" />
  </button>
  <p class="font-medium">Cloud</p>
</header>

<div class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
  <div class="flex items-center space-x-4 w-full">
    <Cloud />
    <p class="text-base">Cloud synced</p>
  </div>
</div>

<button on:click={handleLogout} class="flex space-x-4 items-center w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:text-destructive">
  <LogOut />
  <p class="text-base">Logout</p>
</button>
