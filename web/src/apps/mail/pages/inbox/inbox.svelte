<script lang="ts">
  import ChevronRight from "@lucide/svelte/icons/chevron-right";

  import { turncate } from "$lib/utils/utils";

  import { mailApp } from "../../state/mail-app.svelte";
</script>

<header class="flex items-center w-full mt-12 px-4 pb-3 border-b">
  <p class="font-medium text-sm">Inbox</p>
</header>

<div class="flex flex-col w-full h-[calc(100%-7.9rem)] overflow-y-auto pb-6">
  {#each mailApp.messages as message (message.id)}
    <button
      class="flex flex-col justify-center w-full min-h-16 px-4 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
      onclick={() => mailApp.openMessage(message)}
    >
      <div class="flex justify-between w-full">
        <span class="text-xs font-medium">{message.subject}</span>
        <div class="flex items-center space-x-1 text-muted-foreground">
          <span class="text-xs -mt-[0.1rem]">{message.timestamp}</span>
          <ChevronRight class="size-4 text-muted-foreground group-hover:text-foreground" />
        </div>
      </div>
      <span class="text-xs text-muted-foreground">
        {turncate(message.preview, 45)}
      </span>
    </button>
  {/each}
</div>
