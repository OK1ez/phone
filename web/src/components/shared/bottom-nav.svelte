<script lang="ts">
  type Button = {
    icon: any;
    page: string;
  };

  interface Props {
    buttons?: Button[];
    activePage: string;
    setActivePage: (page: string) => void;
  }

  let { buttons = [], activePage, setActivePage }: Props = $props();
</script>

<nav class="absolute bottom-0 flex items-center justify-between w-full h-24 px-16 pb-6 border-t bg-background">
  {#each buttons as { icon: Icon, page }}
    <button onclick={() => setActivePage(page)} aria-label="Go to {page}" >
      <Icon size={25} class={activePage === page ? "" : "text-gray-400"} />
    </button>
  {/each}
</nav>