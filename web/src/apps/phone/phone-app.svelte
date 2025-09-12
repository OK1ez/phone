<script lang="ts">
  import { phoneApp } from "./phone.svelte";

  import Star from "lucide-svelte/icons/star";
  import Clock from "lucide-svelte/icons/clock";
  import Contact from "lucide-svelte/icons/contact";
  import Grip from "lucide-svelte/icons/grip";

  let CurrentRoute = $derived(phoneApp.routes[phoneApp.currentRoute].route);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key phoneApp.currentRoute}
    <div class="w-full h-full absolute">
      <CurrentRoute />
    </div>
  {/key}
  <div
    class="absolute bottom-0 flex items-center justify-center space-x-6 w-full h-20 px-12 pb-4 border-t bg-background"
  >
    <button
      class="p-4 {phoneApp.currentRoute === 'favorites'
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'}"
      onclick={() => phoneApp.navigate("favorites")}
    >
      <Star class="size-5" />
    </button>
    <button
      class="p-4 {phoneApp.currentRoute === 'recents'
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'}"
      onclick={() => phoneApp.navigate("recents")}
    >
      <Clock class="size-5" />
    </button>
    <button
      class="p-4 {phoneApp.currentRoute === 'contacts'
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'}"
      onclick={() => phoneApp.navigate("contacts")}
    >
      <Contact class="size-5" />
    </button>
    <button
      class="p-4 {phoneApp.currentRoute === 'keypad'
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'}"
      onclick={() => phoneApp.navigate("keypad")}
    >
      <Grip class="size-5" />
    </button>
  </div>
</div>
