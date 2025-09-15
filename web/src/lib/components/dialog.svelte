<script>
  import { fly } from "svelte/transition";
  import X from "@lucide/svelte/icons/x";

  let {
    title = "Dialog",
    description = "",
    isOpen = false,
    onClose = () => {},
    size = "max-w-md",

    children,
  } = $props();
</script>

{#if isOpen}
  <!-- onclick={onClose} -->
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute bg-black/50 w-[70rem] h-[45rem] rounded-lg"></div>
    <div
      class="bg-background relative z-10 grid w-full gap-4 rounded-lg border p-6 shadow-lg duration-200 {size
        ? size
        : 'max-w-md'}"
      onclick={(e) => e.stopPropagation()}
    >
      <!-- header -->
      <div class="flex flex-col gap-2 text-center sm:text-left">
        <h2 class="text-lg font-semibold leading-none">{title}</h2>
        {#if description}
          <p class="text-muted-foreground text-sm">{description}</p>
        {/if}
      </div>

      {@render children()}

      <button
        onclick={onClose}
        class="outline-none absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
      >
        <X />
      </button>
    </div>
  </div>
{/if}
