<script lang="ts">
  import { Input } from "@/components/ui/input";
  import X from "lucide-svelte/icons/x";
  import type { Item, AutocompleteProps } from "@/types/autocomplete";
  import { fetchData } from "@/utils/fetchData";
  import { actionsManager } from "@/states/actions.svelte";

  let {
    items = [],
    name = "",
    value = "",
    placeholder = "",
    relativeData = "",
    onChange = (value: string) => {},
    class: className = "",
  }: AutocompleteProps = $props();

  let inputValue = $state("");
  let isOpen = $state(false);
  let fetchedItems = $state<Item[]>([]);
  let inputHovered = $state(false);

  const isStaticItems = $derived(Array.isArray(items));
  const itemsKey = $derived(!isStaticItems ? (items as string) : null);
  const actualItems = $derived(
    isStaticItems ? (items as Item[]) : fetchedItems,
  );
  const filteredItems = $derived(
    actualItems?.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase()),
    ) || [],
  );

  $effect(async () => {
    if (!itemsKey) return;
    fetchedItems = await fetchData(itemsKey, relativeData);
  });

  async function handleOpen() {
    if (itemsKey) {
      fetchedItems = await fetchData(itemsKey, relativeData);
    }
    isOpen = true;
  }

  function handleSelect(item: Item) {
    inputValue = item.label;
    value = item.value as string;
    actionsManager.autocompleteValues[name] = value;
    onChange(item.value as string);
    isOpen = false;
  }

  function handleClear() {
    inputValue = "";
    value = "";
    actionsManager.autocompleteValues[name] = "";
    onChange("");

    actionsManager.items.forEach((item) => {
      item.args?.forEach((arg) => {
        if (arg.component === "autocomplete" && arg.relativeData === name) {
          actionsManager.autocompleteValues[arg.key] = "";
        }
      });
    });
  }

  $effect(() => {
    const currentValue = actionsManager.autocompleteValues[name];
    if (currentValue === "") {
      inputValue = "";
      value = "";
    } else if (currentValue) {
      const selectedItem = actualItems?.find(
        (item) => item.value === currentValue,
      );
      if (selectedItem) {
        inputValue = selectedItem.label;
        value = selectedItem.value as string;
      }
    }
  });

  $effect(() => {
    if (value && !actionsManager.autocompleteValues[name]) {
      const selectedItem = actualItems?.find((item) => item.value === value);
      if (selectedItem) {
        inputValue = selectedItem.label;
        actionsManager.autocompleteValues[name] = value;
      }
    }
  });
</script>

<div class="relative {className}">
  <div
    class="relative"
    onmouseenter={() => (inputHovered = true)}
    onmouseleave={() => (inputHovered = false)}
  >
    <Input
      value={inputValue}
      oninput={(e) => (inputValue = e.target.value)}
      onblur={() => (isOpen = false)}
      onfocus={handleOpen}
      {placeholder}
      class="pr-8 w-full"
    />

    {#if inputValue && inputHovered}
      <button
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 transition-opacity p-1 hover:bg-muted rounded-sm"
        onclick={handleClear}
      >
        <X class="h-4 w-4 text-muted-foreground" />
      </button>
    {/if}
  </div>

  <input type="hidden" {name} value={value || ""} />

  {#if isOpen && filteredItems?.length > 0}
    <div
      class="absolute w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto z-50 p-1"
    >
      <ul>
        {#each filteredItems as item}
          <li
            class="px-2 py-1.5 hover:bg-secondary hover:text-secondary-foreground cursor-pointer rounded-md text-sm"
            onmousedown={() => handleSelect(item)}
          >
            {item.label}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
