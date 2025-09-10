<script lang="ts">
  import Images from "lucide-svelte/icons/images";
  import SendHorizontal from "lucide-svelte/icons/send-horizontal";

  interface Props {
    value?: string;
    placeholder?: string;
    onSend?: (message: string) => void;
    onImageUpload?: () => void;
    class?: string;
    element?: HTMLElement;
  }

  let {
    value = $bindable(""),
    placeholder = "Message",
    onSend,
    onImageUpload,
    class: className = "",
    element = $bindable<HTMLElement>(),
  }: Props = $props();

  let container: HTMLDivElement;
  let footerElement: HTMLElement;

  $effect(() => {
    if (footerElement) element = footerElement;
  });

  function autoResize(node: HTMLTextAreaElement) {
    const resize = () => {
      node.style.height = "auto";
      const height = Math.min(Math.max(20, node.scrollHeight), 160);
      node.style.height = height + "px";

      const multi = height > 20;
      const classes = container.classList;
      classes.toggle("py-1", !multi);
      classes.toggle("py-2", multi);
      classes.toggle("items-center", !multi);
      classes.toggle("items-end", multi);

      node.style.overflowY = height === 160 ? "auto" : "hidden";
    };

    node.addEventListener("input", resize);
    resize();
    return { destroy: () => node.removeEventListener("input", resize) };
  }

  function handleSend() {
    if (value.trim() && onSend) {
      onSend(value);
      value = "";
      if (container) {
        const textarea = container.querySelector("textarea");
        if (textarea) {
          textarea.style.height = "auto";
          textarea.style.height = "20px";
          container.classList.remove("py-2", "items-end");
          container.classList.add("py-1", "items-center");
        }
      }
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
</script>

<footer
  bind:this={footerElement}
  class="flex items-end justify-between w-full mb-[2rem] px-5 pt-4 border-t space-x-2 bottom-0 absolute bg-background {className}"
>
  <div
    bind:this={container}
    class="bg-input/40 min-h-9 rounded-lg w-full flex items-center justify-between px-2 pl-3 py-1"
  >
    <textarea
      bind:value
      use:autoResize
      rows="1"
      class="bg-transparent text-xs w-56 focus:outline-none placeholder:text-muted-foreground resize-none overflow-hidden leading-5"
      {placeholder}
      onkeydown={handleKeydown}
    ></textarea>
    <div class="flex space-x-1">
      <button
        type="button"
        class="min-w-6 min-h-6 flex items-center justify-center group"
        onclick={handleImageUpload}
        aria-label="Upload image"
      >
        <Images
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </button>
      <button
        type="button"
        class="min-w-6 min-h-6 flex items-center justify-center group"
        onclick={handleSend}
        disabled={!value}
        aria-label="Send message"
      >
        <SendHorizontal
          class="size-4 text-muted-foreground group-hover:text-foreground {!value.trim()
            ? 'opacity-50'
            : ''}"
        />
      </button>
    </div>
  </div>
</footer>
