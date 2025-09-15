<script lang="ts">
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import Check from "@lucide/svelte/icons/check";

  type Item = {
    label: string;
    value: any;
  };

  let {
    items = [],
    name = "",
    value = $bindable(""),
    default: defaultValue = undefined,
    placeholder = "Select...",
    onChange = (value: any) => {},
  } = $props();

  let isOpen = $state(false);
  let processedItems = $state<Item[]>([]);

  $effect(() => {
    processedItems = items || [];

    if (!value && defaultValue !== undefined) {
      value = defaultValue;
    }
  });

  function selectItem(item: Item) {
    value = item.value;
    isOpen = false;
    onChange(item.value);
  }

  let selectedLabel = $derived(processedItems?.find((item) => item.value === value)?.label ?? placeholder);

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function handleClickOutside(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest(".select-container")) {
      isOpen = false;
    }
  }

  $effect(() => {
    if (!isOpen) return;
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
</script>

<div class="relative select-container">
  <button
    type="button"
    class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 {!value
      ? 'text-muted-foreground'
      : ''}"
    onclick={toggleDropdown}
  >
    <span>{selectedLabel}</span>
    <ChevronDown
      class="h-4 w-4 text-muted-foreground transition-transform duration-200 {isOpen ? 'rotate-180' : 'rotate-0'}"
    />
  </button>

  <input type="hidden" {name} value={value || ""} />

  {#if isOpen && processedItems?.length > 0}
    <div class="absolute w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto z-50 p-1">
      <ul>
        {#each processedItems as item}
          <li
            class="pl-2 py-1.5 hover:bg-secondary hover:text-secondary-foreground cursor-pointer rounded-md text-sm flex items-center justify-between"
            onmousedown={() => selectItem(item)}
          >
            <span>{item.label}</span>
            {#if item.value === value}
              <Check class="mr-2 h-4 w-4 opacity-50" />
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
