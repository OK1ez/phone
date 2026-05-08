<script lang="ts">
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import Search from "@lucide/svelte/icons/search";
  import MessageCirclePlus from "@lucide/svelte/icons/message-circle-plus";

  import { messagesApp } from "../../state/messages-app.svelte";

  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "$lib/components/ui/drawer";

  const conversations = Array.from({ length: 10 }, (_, index) => ({
    id: `conversation-${index}`,
    name: "Herman Jonsen",
    preview: "Hey how are you?",
    timestamp: "Yesterday",
  }));

  let activeTab = $state("all");
  let newMessage = $state(false);
</script>

<header class="flex items-center justify-between w-full mt-12 px-4 pb-2 space-x-2">
  <div class="bg-input/70 h-8 rounded-lg w-full flex items-center px-3 space-x-2">
    <Search class="size-3.5 text-muted-foreground" />
    <input
      type="text"
      class="bg-transparent text-xs w-full h-full focus:outline-hidden placeholder:text-muted-foreground mt-[0.1rem] tracking-wide"
      placeholder="Search recents"
    />
  </div>

  <Drawer bind:open={newMessage}>
    <DrawerTrigger>
      <button class="bg-input/70 min-w-8 min-h-8 rounded-lg flex items-center justify-center group">
        <MessageCirclePlus class="size-3.5 text-muted-foreground group-hover:text-foreground" />
      </button>
    </DrawerTrigger>

    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>New Message</DrawerTitle>
      </DrawerHeader>

      <div class="flex flex-col space-y-2">
        <div class="space-y-2">
          <p class="flex items-center gap-2 text-xs leading-none font-medium">Number</p>
          <div class="bg-input/40 hover:bg-input/50 h-8 rounded-lg w-full flex items-center px-3 space-x-2 border">
            <input
              type="text"
              class="bg-transparent text-xs w-full h-full focus:outline-hidden placeholder:text-muted-foreground mt-[0.1rem] tracking-wide"
              placeholder="Enter phone number"
            />
          </div>
          <div class="space-y-2">
            <p class="flex items-center gap-2 text-xs leading-none font-medium">Message</p>

            <textarea
              class="flex min-h-16 w-full rounded-lg border border-input px-2.5 py-2 text-xs transition-colors outline-hidden placeholder:text-muted-foreground bg-input/40 hover:bg-input/50 resize-none"
              placeholder="Enter message"
            ></textarea>
          </div>
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose class="w-full">
          <button
            type="button"
            class="bg-input/40 hover:bg-input/50 text-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg border"
          >
            Cancel
          </button>
        </DrawerClose>

        <button
          type="button"
          class="bg-primary hover:bg-primary/80 text-primary-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg"
        >
          Confirm
        </button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</header>

<div class="px-4 pb-3 border-b">
  <div class="bg-input/70 inline-flex items-center justify-center h-8 p-1 text-muted-foreground rounded-lg w-full">
    <button
      class="w-full inline-flex items-center justify-center rounded-md py-1 text-xs tracking-wide hover:text-foreground {activeTab ===
        'all' && 'bg-background text-foreground shadow-xs'}"
      onclick={() => (activeTab = "all")}
    >
      All
    </button>
    <button
      class="w-full inline-flex items-center justify-center rounded-md py-1 text-xs font-medium tracking-wide hover:text-foreground {activeTab ===
        'favorites' && 'bg-background text-foreground shadow-xs'}"
      onclick={() => (activeTab = "favorites")}
    >
      Favorited
    </button>
  </div>
</div>

<div class="flex flex-col w-full h-[calc(100%-7.9rem)] overflow-y-auto pb-8">
  {#each conversations as conversation (conversation.id)}
    <button
      class="flex flex-col justify-center w-full min-h-16 px-4 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
      onclick={() => messagesApp.navigate("conversation")}
    >
      <div class="flex justify-between w-full">
        <span class="text-xs font-medium">{conversation.name}</span>
        <div class="flex items-center space-x-1 text-muted-foreground">
          <span class="text-xs -mt-[0.1rem]">{conversation.timestamp}</span>
          <ChevronRight class="size-4 text-muted-foreground group-hover:text-foreground" />
        </div>
      </div>
      <span class="text-xs text-muted-foreground">{conversation.preview}</span>
    </button>
  {/each}
</div>
