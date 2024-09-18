<script lang="ts">
  import { BellDot, Home, Search, User } from "lucide-svelte";
  import { ACTIVE_PAGE } from "../stores/bleeter";
  
  const buttons = [
    { icon: Home, page: "home" },
    { icon: Search, page: "search" },
    { icon: BellDot, page: "notifications" },
    { icon: User, page: "profile" }
  ];

  function setActivePage(page: string) {
    ACTIVE_PAGE.set(page);
  }
</script>
  
<nav class="absolute bottom-0 flex items-center justify-between w-full h-24 px-16 pb-6 border-t bg-background">
  {#each buttons as { icon: Icon, page }}
    <button on:click={() => setActivePage(page)}>
      <Icon size={25} class={$ACTIVE_PAGE === page ? "" : "text-gray-400"} />
    </button>
  {/each}
</nav>
