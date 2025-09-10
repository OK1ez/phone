<script lang="ts">
  let { class: className = "", children } = $props();

  let isOpen = $state(false);
  let dropdownRef: HTMLDivElement;

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef && !dropdownRef.contains(event.target as Node) && isOpen) {
      isOpen = false;
    }
  };

  $effect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  // Provide context to child components
  const context = {
    get isOpen() {
      return isOpen;
    },
    set isOpen(value: boolean) {
      isOpen = value;
    },
    toggle: () => {
      isOpen = !isOpen;
    },
  };
</script>

<div
  class="relative inline-block text-left {className}"
  bind:this={dropdownRef}
>
  {@render children?.(context)}
</div>
