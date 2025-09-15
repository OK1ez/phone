<script lang="ts">
  import Copy from "@lucide/svelte/icons/copy";
  import Check from "@lucide/svelte/icons/check";
  import { setClipboard } from "$lib/utils/utils";

  interface Props {
    text?: string;
    hover?: boolean;
    size?: string;
  }

  let { text, hover = true, size = "size-8" } = $props<Props>();
  let copied = $state(false);

  function handleCopy(event: MouseEvent) {
    copied = true;

    const contentToCopy = text || (event.currentTarget as HTMLElement).parentElement?.textContent?.trim() || "";

    setClipboard(contentToCopy);

    const timer = setTimeout(() => {
      copied = false;
    }, 1500);

    return () => clearTimeout(timer);
  }
</script>

<button
  onclick={handleCopy}
  disabled={copied}
  class="{size} {hover ? 'hover:bg-sidebar-accent' : ''} rounded-md flex items-center justify-center"
>
  <div class="absolute transition-all {copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}">
    <Check class="stroke-emerald-500" size={14} strokeWidth={2} aria-hidden="true" />
  </div>
  <div class="absolute transition-all {copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}">
    <Copy size={14} strokeWidth={2} aria-hidden="true" />
  </div>
</button>
