<script>
  import { ChevronLeft } from "lucide-svelte";
  import { goBack } from "../../stores/settings";
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <button onclick={goBack} class="text-gray-400 hover:text-foreground">
    <ChevronLeft className="w-6 h-6" />
  </button>
  <p class="font-medium">Sounds</p>
</header>