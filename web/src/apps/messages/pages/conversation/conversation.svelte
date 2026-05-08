<script lang="ts">
  import { tick } from "svelte";
  import { calls } from "$phone/state/calls.svelte";
  import { phone } from "$phone/state/phone.svelte";
  import { mediaViewer } from "$phone/state/media-viewer.svelte";
  import SharedImage from "$lib/components/shared-image.svelte";
  import Video from "@lucide/svelte/icons/video";
  import UserPlus from "@lucide/svelte/icons/user-plus";
  import UserPen from "@lucide/svelte/icons/user-pen";

  import type { SharedImageAsset } from "$lib/types/media";

  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import MapPin from "@lucide/svelte/icons/map-pin";
  import PhoneIcon from "@lucide/svelte/icons/phone";
  import MessageInput from "../../components/message-input.svelte";

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

  let messageValue = $state("");
  let messagesContainer = $state<HTMLDivElement | undefined>();
  let messageInputElement = $state<HTMLElement | undefined>();
  let shouldStickToBottom = $state(true);
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  const testImageUrl = "https://r2.fivemanage.com/Yl9OcgxACkrz1IbRcV7P2/Skjermbilde2026-04-07170537.png";

  type MessageSender = "me" | "other";
  type MessageItem =
    | {
        sender: MessageSender;
        type: "text";
        content: string;
        timestamp: string;
      }
    | {
        sender: MessageSender;
        type: "location";
        title: string;
        timestamp: string;
      }
    | {
        sender: MessageSender;
        type: "images";
        images: SharedImageAsset[];
        timestamp: string;
      };

  async function scrollToBottom() {
    await tick();

    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  function isNearBottom() {
    if (!messagesContainer) return true;

    return messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < 24;
  }

  function handleMessagesScroll() {
    shouldStickToBottom = isNearBottom();
  }

  async function handleSendMessage(message: string) {
    messagesMockData = [
      ...messagesMockData,
      {
        sender: "me",
        type: "text",
        content: message,
        timestamp: new Date().toISOString(),
      },
    ];

    shouldStickToBottom = true;
    await scrollToBottom();
  }

  async function handleSendLocation() {
    messagesMockData = [
      ...messagesMockData,
      {
        sender: "me",
        type: "location",
        title: "Current Location",
        timestamp: new Date().toISOString(),
      },
    ];

    shouldStickToBottom = true;
    await scrollToBottom();
  }

  function handleImageUpload() {
    console.log("Image upload clicked");
  }

  function startCall() {
    calls.startOutgoingCall({
      name: "Mads",
      number: "+47 400 22 222",
    });
  }

  function formatTimestamp(timestamp: string) {
    return timeFormatter.format(new Date(timestamp));
  }

  function getBubbleClasses(sender: MessageSender) {
    return sender === "me" ? "bg-sky-600 text-white" : "bg-secondary text-foreground";
  }

  function getMediaShellClasses(sender: MessageSender) {
    return sender === "me" ? "bg-sky-600/95" : "bg-secondary";
  }

  function openImageViewer(image: SharedImageAsset) {
    mediaViewer.openImage(image);
  }

  $effect(() => {
    if (messageInputElement && messagesContainer) {
      scrollToBottom();

      const resizeObserver = new ResizeObserver(() => {
        if (shouldStickToBottom) {
          scrollToBottom();
        }
      });

      resizeObserver.observe(messageInputElement);

      return () => {
        resizeObserver.disconnect();
      };
    }
  });

  $effect(() => {
    messagesMockData.length;

    if (shouldStickToBottom) {
      scrollToBottom();
    }
  });

  let messagesMockData = $state<MessageItem[]>([
    {
      sender: "me",
      type: "text",
      content: "Hey Alice, how are you?",
      timestamp: new Date().toISOString(),
    },
    {
      sender: "other",
      type: "text",
      content: "Hi! I'm good, thanks. How about you?",
      timestamp: new Date().toISOString(),
    },
    {
      sender: "me",
      type: "text",
      content: "I'm doing well. Want to grab coffee later?",
      timestamp: new Date().toISOString(),
    },
    {
      sender: "other",
      type: "images",
      images: [
        {
          url: testImageUrl,
          alt: "Delivery update screenshot one",
        },
        {
          url: testImageUrl,
          alt: "Delivery update screenshot two",
        },
        {
          url: testImageUrl,
          alt: "Delivery update screenshot three",
        },
      ],
      timestamp: new Date().toISOString(),
    },
    {
      sender: "other",
      type: "location",
      title: "Mads's Location",
      timestamp: new Date().toISOString(),
    },
  ]);

  let addContact = $state(false);
  let number = $state("40022222");
</script>

<div class="flex h-full min-h-0 flex-col">
  <header class="flex shrink-0 items-center justify-between w-full mt-12 px-4 pb-3 border-b">
    <button class="flex items-center space-x-2 group" onclick={() => messagesApp.navigate("recents", true)}>
      <ChevronLeft class="size-4 text-muted-foreground group-hover:text-foreground" />
      <p class="font-medium text-sm">Mads</p>
    </button>
    <div class="flex space-x-1">
      <Drawer bind:open={addContact}>
        <DrawerTrigger>
          <button class="group relative flex items-center justify-center size-6 -my-3">
            <UserPlus class="size-3.5 text-muted-foreground group-hover:text-foreground" />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add Contact</DrawerTitle>
          </DrawerHeader>

          <div class="flex flex-col space-y-2">
            <div class="space-y-2">
              <p class="flex items-center gap-2 text-xs leading-none font-medium">Name</p>
              <div class="bg-input/40 hover:bg-input/60 h-8 rounded-lg w-full flex items-center px-3 space-x-2 border">
                <input
                  type="text"
                  class="bg-transparent text-xs w-full h-full focus:outline-hidden placeholder:text-muted-foreground mt-[0.1rem] tracking-wide"
                  placeholder="Enter name"
                />
              </div>
            </div>
            <div class="space-y-2">
              <p class="flex items-center gap-2 text-xs leading-none font-medium">Number</p>
              <div class="bg-input/40 hover:bg-input/60 h-8 rounded-lg w-full flex items-center px-3 space-x-2 border">
                <input
                  type="text"
                  class="bg-transparent text-xs w-full h-full focus:outline-hidden placeholder:text-muted-foreground mt-[0.1rem] tracking-wide"
                  placeholder="Enter phone number"
                  value={number}
                />
              </div>
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose class="w-full">
              <button
                type="button"
                class="bg-input/30 hover:bg-input/50 text-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg border"
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
      <!-- <button class="group relative flex items-center justify-center size-6 -my-3" onclick={startCall}>
        <UserPen class="size-3.5 text-muted-foreground group-hover:text-foreground" />
      </button>
      <button class="group relative flex items-center justify-center size-6 -my-3" onclick={startCall}>
        <Video class="size-4 text-muted-foreground group-hover:text-foreground" />
      </button> -->
      <button class="group relative flex items-center justify-center size-6 -my-3" onclick={startCall}>
        <PhoneIcon class="size-3 text-muted-foreground group-hover:text-foreground" />
      </button>
    </div>
  </header>

  <div
    bind:this={messagesContainer}
    class="w-full flex-1 min-h-0 overflow-y-auto px-4 py-4"
    onscroll={handleMessagesScroll}
  >
    <div class="flex min-h-full w-full flex-col justify-end gap-4">
      <div class="relative mb-4">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t"></span>
        </div>
        <div class="relative flex justify-center text-xs font-medium">
          <span class="bg-background px-2 text-muted-foreground/60">End of Conversation</span>
        </div>
      </div>

      {#each messagesMockData as message, index (`${message.timestamp}-${index}`)}
        <div class="flex w-full flex-col {message.sender === 'me' ? 'items-end' : 'items-start'}">
          {#if message.type === "location"}
            <button
              class="px-2 py-2 rounded-lg max-w-72 text-xs space-x-1.5 flex {message.sender === 'me'
                ? 'bg-sky-600 hover:bg-sky-600/80'
                : 'bg-secondary hover:bg-secondary/80'}"
            >
              <MapPin class="size-3.5 shrink-0" />
              <span>Shared Location</span>
            </button>
          {:else if message.type === "images"}
            <div class="max-w-64 rounded-[1.2rem] p-1.5 {getMediaShellClasses(message.sender)}">
              <div class="flex flex-col gap-1.5">
                {#each message.images as image, imageIndex (`${image.url}-${imageIndex}`)}
                  <SharedImage {image} onOpen={openImageViewer} />
                {/each}
              </div>
            </div>
          {:else}
            <div
              class="px-3 py-2 rounded-lg max-w-64 text-xs whitespace-pre-wrap wrap-break-word {getBubbleClasses(
                message.sender,
              )}"
            >
              {message.content}
            </div>
          {/if}
          <p class="mt-1 px-1 text-[10px] leading-none text-muted-foreground">
            {formatTimestamp(message.timestamp)}
          </p>
        </div>
      {/each}
    </div>
  </div>

  <MessageInput
    bind:element={messageInputElement}
    bind:value={messageValue}
    placeholder="Type a message"
    onSend={handleSendMessage}
    onSendLocation={handleSendLocation}
    onImageUpload={handleImageUpload}
  />
</div>
