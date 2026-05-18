<script lang="ts">
  import { phoneApp } from "./state/phone-app.svelte";

  import Clock from "@lucide/svelte/icons/clock";
  import Contact from "@lucide/svelte/icons/contact";
  import Grip from "@lucide/svelte/icons/grip";

  let CurrentRoute = $derived(phoneApp.router.currentComponent);
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#key phoneApp.router.currentRoute}
    <div class="w-full h-full absolute">
      <CurrentRoute />
    </div>
  {/key}
  <div
    class="absolute bottom-0 flex items-center justify-center space-x-10 w-full h-20 px-12 pb-4 border-t bg-background"
  >
    <button
      class="p-4 {phoneApp.router.currentRoute === 'recents'
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'}"
      onclick={() => phoneApp.router.navigate("recents")}
    >
      <Clock class="size-5" />
    </button>
    <button
      class="p-4 {phoneApp.router.currentRoute === 'contacts'
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'}"
      onclick={() => phoneApp.router.navigate("contacts")}
    >
      <Contact class="size-5" />
    </button>
    <button
      class="p-4 {phoneApp.router.currentRoute === 'keypad'
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'}"
      onclick={() => phoneApp.router.navigate("keypad")}
    >
      <Grip class="size-5" />
    </button>
  </div>
</div>
