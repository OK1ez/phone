<script lang="ts">
  import Image from "@lucide/svelte/icons/image";
  import SendHorizontal from "@lucide/svelte/icons/send-horizontal";
  import Navigation from "@lucide/svelte/icons/navigation";
  import Meh from "@lucide/svelte/icons/meh";
  import { notifications } from "$phone/state/notifications.svelte";
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

  interface Props {
    value?: string;
    placeholder?: string;
    onSend?: (message: string) => void;
    onSendLocation?: () => void;
    onImageUpload?: () => void;
    class?: string;
    element?: HTMLElement;
  }

  let {
    value = $bindable(""),
    placeholder = "Message",
    onSend,
    onSendLocation,
    onImageUpload,
    class: className = "",
    element = $bindable<HTMLElement>(),
  }: Props = $props();

  let footerElement: HTMLElement;
  let textarea: HTMLTextAreaElement;
  let locationDrawerOpen = $state(false);

  $effect(() => {
    if (footerElement) element = footerElement;
  });

  function resizeTextarea() {
    if (!textarea) return;

    textarea.style.height = "auto";
    const { lineHeight, borderTopWidth, borderBottomWidth } = getComputedStyle(textarea);
    const maxHeight =
      Number.parseFloat(lineHeight) * 3 + Number.parseFloat(borderTopWidth) + Number.parseFloat(borderBottomWidth);

    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }

  $effect(() => {
    value;
    textarea;
    resizeTextarea();
  });

  function handleSend() {
    if (value.trim() && onSend) {
      onSend(value);
      value = "";
      resizeTextarea();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  function handleImageUpload() {
    if (onImageUpload) {
      onImageUpload();
    }
  }

  function clickButtonImage() {
    notifications.enqueue({
      appId: "phone",
      title: "New message",
      body: "Mads sent you a text",
    });
  }

  function confirmShareLocation() {
    locationDrawerOpen = false;
    if (onSendLocation) {
      onSendLocation();
    }
  }
</script>

<footer bind:this={footerElement} class="flex flex-col w-full shrink-0 mb-8 px-4 pt-4 bg-background {className}">
  <div class="bg-input/40 min-h-8 rounded-t-lg w-full flex items-end justify-between px-2 pl-3 py-2 border border-b-0">
    <textarea
      bind:this={textarea}
      bind:value
      rows="1"
      class="bg-transparent text-xs w-56 max-h-15 focus:outline-hidden placeholder:text-muted-foreground resize-none overflow-hidden leading-5"
      {placeholder}
      oninput={resizeTextarea}
      onkeydown={handleKeydown}
    ></textarea>
    <button
      type="button"
      class="min-w-6 min-h-6 flex items-center justify-center group"
      onclick={handleSend}
      disabled={!value}
      aria-label="Send message"
    >
      <SendHorizontal
        class="size-4 text-muted-foreground group-hover:text-foreground {!value.trim() ? 'opacity-50' : ''}"
      />
    </button>
  </div>
  <div class="bg-input/60 min-h-6 rounded-b-lg w-full border flex overflow-hidden">
    <button onclick={clickButtonImage} class="h-full w-full flex items-center justify-center hover:bg-secondary">
      <Image class="size-3 text-muted-foreground group-hover:text-foreground" />
    </button>
    <button class="h-full w-full flex items-center justify-center hover:bg-secondary">
      <Meh class="size-3 text-muted-foreground group-hover:text-foreground" />
    </button>

    <Drawer bind:open={locationDrawerOpen}>
      <DrawerTrigger class="h-full w-full">
        <button type="button" class="h-full w-full flex items-center justify-center hover:bg-secondary">
          <Navigation class="size-3 text-muted-foreground group-hover:text-foreground" />
        </button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Confirmation</DrawerTitle>
          <DrawerDescription>Are you sure you want to share your current location?</DrawerDescription>
        </DrawerHeader>
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
            onclick={confirmShareLocation}
          >
            Confirm
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</footer>
