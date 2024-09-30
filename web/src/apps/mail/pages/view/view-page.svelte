<script lang="ts">
  import { ChevronLeft, Trash } from "lucide-svelte";
  import { ACTIVE_PAGE } from "../../stores/mail";

  function goBack() {
    ACTIVE_PAGE.set("inbox");
  }
</script>

<header class="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
  <button on:click={goBack}>
    <ChevronLeft class="w-6 h-6 text-gray-400 hover:text-foreground" />
  </button>
  <button>
    <Trash class="w-6 h-6 text-gray-400 hover:text-foreground" />
  </button>
</header>
