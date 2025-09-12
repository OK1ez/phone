<script lang="ts">
  import { messagesApp } from "../../messages.svelte";

  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import PhoneIcon from "lucide-svelte/icons/phone";
  import MessageInput from "../../components/message-input.svelte";

  let messageValue = $state("");
  let messagesContainer: HTMLDivElement;
  let messageInputElement: HTMLElement;

  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  function updateMessagesContainerHeight() {
    if (messagesContainer && messageInputElement) {
      const footerHeight = messageInputElement.offsetHeight;
      const baseHeight = 588;
      const newHeight = baseHeight - footerHeight;
      messagesContainer.style.height = `${newHeight}px`;
    }
  }

  function handleSendMessage(message: string) {
    messagesMockData = [
      ...messagesMockData,
      {
        sender: "me",
        content: message,
        timestamp: new Date().toISOString(),
      },
    ];

    setTimeout(scrollToBottom, 0);
  }

  function handleImageUpload() {
    console.log("Image upload clicked");
  }

  $effect(() => {
    if (messageInputElement && messagesContainer) {
      updateMessagesContainerHeight();
      scrollToBottom();

      const resizeObserver = new ResizeObserver(() => {
        updateMessagesContainerHeight();
        scrollToBottom();
      });

      resizeObserver.observe(messageInputElement);

      return () => {
        resizeObserver.disconnect();
      };
    }
  });

  let messagesMockData = $state([
    {
      sender: "me",
      content: "Hey Alice, how are you?",
      timestamp: new Date().toISOString(),
    },
    {
      sender: "other",
      content: "Hi! I'm good, thanks. How about you?",
      timestamp: new Date().toISOString(),
    },
    {
      sender: "me",
      content: "I'm doing well. Want to grab coffee later?",
      timestamp: new Date().toISOString(),
    },
  ]);
</script>

<header
  class="flex items-center justify-between w-full mt-[4.5rem] px-6 pb-4 border-b"
>
  <button
    class="group relative flex items-center justify-center size-10 -m-3"
    onclick={() => messagesApp.navigate("recents", true)}
  >
    <ChevronLeft
      class="size-5 text-muted-foreground group-hover:text-foreground"
    />
  </button>
  <p class="font-medium text-xs">Mads</p>
  <button class="group relative flex items-center justify-center size-10 -m-3">
    <PhoneIcon
      class="size-4 text-muted-foreground group-hover:text-foreground"
    />
  </button>
</header>

<div
  bind:this={messagesContainer}
  class="flex flex-col w-full overflow-y-auto p-6 space-y-4 h-[33rem]"
>
  {#each messagesMockData as message}
    <div
      class="flex w-full {message.sender === 'me'
        ? 'justify-end'
        : 'justify-start'}"
    >
      <div
        class="px-3 py-2 rounded-2xl max-w-72 text-xs {message.sender === 'me'
          ? ' bg-sky-600 rounded-br-none'
          : 'bg-secondary rounded-bl-none'}"
      >
        {message.content}
      </div>
    </div>
  {/each}
</div>

<MessageInput
  bind:element={messageInputElement}
  bind:value={messageValue}
  placeholder="Message"
  onSend={handleSendMessage}
  onImageUpload={handleImageUpload}
/>
