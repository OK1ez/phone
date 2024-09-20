<script lang="ts">
  type Button = {
    icon: any;
    page: string;
  };

  export let buttons: Button[] = [];
  export let activePage: string;
  export let setActivePage: (page: string) => void;
</script>

<nav class="absolute bottom-0 flex items-center justify-between w-full h-24 px-16 pb-6 border-t bg-background">
  {#each buttons as { icon: Icon, page }}
    <button on:click={() => setActivePage(page)} aria-label="Go to {page}" >
      <Icon size={25} class={activePage === page ? "" : "text-gray-400"} />
    </button>
  {/each}
</nav>