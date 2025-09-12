<script lang="ts">
  import { messagesApp } from "../../messages.svelte";

  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import Search from "lucide-svelte/icons/search";
  import CirclePlus from "lucide-svelte/icons/plus-circle";
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
        placeholder="Search recents"
      />
    </div>
    <!-- this should clean input if its has text -->
    <!-- {#if hasText}
      <button class="text-muted-foreground hover:text-foreground">
        <X class="size-3.5 " />
      </button>
    {/if} -->
  </div>
  <button
    class="bg-input/40 hover:bg-input/60 min-w-9 min-h-9 rounded-full flex items-center justify-center group"
  >
    <CirclePlus
      class="size-4 text-muted-foreground group-hover:text-foreground"
    />
  </button>
</header>

<div class="flex flex-col w-full h-[calc(100%-7.9rem)] overflow-y-auto pb-6">
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => messagesApp.navigate("conversation")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Herman Jonsen</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground"> Hey how are you? </span>
  </button>
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => messagesApp.navigate("conversation")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Herman Jonsen</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground"> Hey how are you? </span>
  </button>
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => messagesApp.navigate("conversation")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Herman Jonsen</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground"> Hey how are you? </span>
  </button>
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => messagesApp.navigate("conversation")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Herman Jonsen</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground"> Hey how are you? </span>
  </button>
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => messagesApp.navigate("conversation")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Herman Jonsen</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground"> Hey how are you? </span>
  </button>
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => messagesApp.navigate("conversation")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Herman Jonsen</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground"> Hey how are you? </span>
  </button>
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => messagesApp.navigate("conversation")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Herman Jonsen</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground"> Hey how are you? </span>
  </button>
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => messagesApp.navigate("conversation")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Herman Jonsen</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground"> Hey how are you? </span>
  </button>
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => messagesApp.navigate("conversation")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Herman Jonsen</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground"> Hey how are you? </span>
  </button>
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => messagesApp.navigate("conversation")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Herman Jonsen</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground"> Hey how are you? </span>
  </button>
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => messagesApp.navigate("conversation")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Herman Jonsen</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground"> Hey how are you? </span>
  </button>
</div>
