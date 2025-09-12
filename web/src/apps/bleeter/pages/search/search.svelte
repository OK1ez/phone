<script lang="ts">
  import Search from "lucide-svelte/icons/search";
</script>

<header
  class="flex items-center justify-between w-full mt-[4.5rem] px-5 pb-4 border-b space-x-2"
>
  <div
    class="bg-input/40 h-9 rounded-full w-full flex items-center justify-between px-3"
  >
    <div class="flex items-center space-x-2">
      <Search class="size-4 text-muted-foreground" />
      <input
        type="text"
        class="bg-transparent text-xs max-w-52 focus:outline-none placeholder:text-muted-foreground mt-[0.1rem]"
        placeholder="Search"
      />
    </div>
    <!-- this should clean input if its has text -->
    <!-- {#if hasText}
      <button class="text-muted-foreground hover:text-foreground">
        <X class="size-3.5 " />
      </button>
    {/if} -->
  </div>
</header>
