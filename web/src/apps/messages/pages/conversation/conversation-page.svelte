<script lang="ts">
  import { onMount } from "svelte";
  import { goBack } from "../../stores/messages";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { ChevronLeft, Images, Mic, Phone, Smile } from "lucide-svelte";
  import { cn } from "@/utils/misc";
  import { SendEvent } from "@/utils/eventsHandlers";

  export let conversationId: number;
  let conversation: any;

  onMount(async () => {
    conversation = await SendEvent(
      "messages:fetchConversation",
      conversationId,
    );
  });
</script>

<header
  class="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b"
>
  <button on:click={goBack}>
    <ChevronLeft class="w-6 h-6 text-gray-400 hover:text-foreground" />
  </button>
  <p class="font-medium">{conversation?.name || "Conversation"}</p>
  <button>
    <Phone class="w-5 h-5 text-gray-400 hover:text-foreground" />
  </button>
</header>

<ScrollArea
  class="flex flex-col w-full h-full max-h-[47.5rem] overflow-y-auto p-6 pb-0"
>
  {#if conversation && conversation.messages}
    {#each conversation.messages as message}
      <div
        class="flex w-full mb-4 {message.sender === 'me'
          ? 'justify-end'
          : 'justify-start'}"
      >
        <div
          class="px-4 py-3 rounded-2xl max-w-72 {message.sender === 'me'
            ? 'bg-sky-400 dark:bg-sky-600 rounded-br-none'
            : 'bg-secondary rounded-bl-none'}"
        >
          {message.content}
        </div>
      </div>
    {/each}
  {/if}
</ScrollArea>

<div class="flex w-full gap-4 px-6 p-4 border-t">
  <button
    class="flex items-center justify-center h-12 rounded-full min-w-12 bg-secondary dark:bg-secondary/30 group"
  >
    <Mic class="w-5 h-5 text-gray-400 group-hover:text-foreground" />
  </button>
  <div
    class="flex items-center w-full h-12 gap-4 px-4 text-lg font-medium transition-all rounded-full bg-secondary dark:bg-secondary/30"
  >
    <input
      type="text"
      placeholder="Type here..."
      class="flex-grow font-normal bg-transparent min-w-14 focus:outline-none"
    />
    <button>
      <Images class="w-5 h-5 text-gray-400 hover:text-foreground" />
    </button>
    <button>
      <Smile class="w-5 h-5 text-gray-400 hover:text-foreground" />
    </button>
  </div>
</div>
