<script lang="ts">
  let {
    items, // Array of items to render
    itemHeight = 48, // Height of each item in pixels
    gap = 16, // Gap between items in pixels
    bufferSize = 2, // Number of items to render above/below the visible area
    keyFn = (item: T, index: number) => index, // Function to get a unique key for each item

    item: renderItem,
    empty: renderEmpty = () => null,
  } = $props<{
    items: T[];
    itemHeight?: number;
    gap?: number;
    bufferSize?: number;
    keyFn?: (item: T, index: number) => string | number;

    item: (item: T) => any;
    empty?: () => any;
  }>();

  const totalItemHeight = $derived(itemHeight + gap);

  let listContainer: HTMLDivElement;
  let containerHeight = $state(0);
  let scrollPosition = $state(0);
  let visibleStartIndex = $state(0);
  let visibleCount = $state(0);

  $effect(() => {
    if (!listContainer || !items || items.length === 0) return;

    const estimatedVisibleItems =
      Math.ceil(containerHeight / totalItemHeight) + bufferSize * 2;

    const estimatedStartIndex = Math.max(
      0,
      Math.floor(scrollPosition / totalItemHeight) - bufferSize,
    );

    visibleStartIndex = estimatedStartIndex;
    visibleCount = Math.min(
      estimatedVisibleItems,
      items.length - visibleStartIndex,
    );
  });

  function handleScroll() {
    if (listContainer) {
      scrollPosition = listContainer.scrollTop;
    }
  }

  function handleResize() {
    if (listContainer) {
      containerHeight = listContainer.clientHeight;
    }
  }

  $effect(() => {
    if (!listContainer) return;

    containerHeight = listContainer.clientHeight;

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(listContainer);

    return () => {
      resizeObserver.disconnect();
    };
  });

  const visibleItems = $derived(
    items.slice(visibleStartIndex, visibleStartIndex + visibleCount),
  );

  const totalHeight = $derived(
    items?.length > 0 ? (items.length - 1) * totalItemHeight + itemHeight : 0,
  );

  function scrollToIndex(index: number) {
    if (listContainer && items && index >= 0 && index < items.length) {
      listContainer.scrollTop = index * totalItemHeight;
    }
  }

  function scrollToTop() {
    if (listContainer) {
      listContainer.scrollTop = 0;
    }
  }

  export { scrollToIndex, scrollToTop };
</script>

<div
  bind:this={listContainer}
  onscroll={handleScroll}
  class="h-full w-full overflow-y-auto p-4 pt-0"
>
  {#if !items || items.length === 0}
    <!-- Empty state -->
    {#if renderEmpty}
      {@render renderEmpty()}
    {:else}
      <div class="flex items-center justify-center h-32 text-muted-foreground">
        No items to display
      </div>
    {/if}
  {:else}
    <div class="relative w-full" style="height: {totalHeight}px;">
      <div
        class="absolute w-full left-0 flex flex-col"
        style="gap: {gap}px; top: {visibleStartIndex * totalItemHeight}px;"
      >
        {#each visibleItems as item, index (keyFn(item, visibleStartIndex + index))}
          <div class="w-full" style="min-height: {itemHeight}px;">
            {@render renderItem(item)}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
