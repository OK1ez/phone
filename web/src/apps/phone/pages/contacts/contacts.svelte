<script>
  import { phoneApp } from "../../phone.svelte";
  import InfoIcon from "lucide-svelte/icons/info";
</script>

<header class="flex items-center w-full mt-[4.5rem] px-6 pb-4 border-b">
  <p class="font-medium text-sm">Contacts</p>
</header>

<div class="flex flex-col w-full h-[calc(100%-11.8rem)] overflow-y-auto">
  <button
    class="flex items-center justify-between w-full min-h-12 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left group"
  >
    <div class="flex items-center space-x-3">
      <img
        src="https://github.com/ok1ez.png"
        alt="avatar"
        class="size-8 rounded-full"
      />
      <span class="text-xs font-medium">OKiez</span>
    </div>
    <InfoIcon
      class="size-4 text-muted-foreground group-hover:text-foreground"
    />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-12 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left group"
  >
    <div class="flex items-center space-x-3">
      <img
        src="https://github.com/madsleander.png"
        alt="avatar"
        class="size-8 rounded-full"
      />
      <span class="text-xs font-medium">Mads</span>
    </div>
    <InfoIcon
      class="size-4 text-muted-foreground group-hover:text-foreground"
    />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-12 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left group"
  >
    <div class="flex items-center space-x-3">
      <img
        src="https://github.com/FjamZoo.png"
        alt="avatar"
        class="size-8 rounded-full"
      />
      <span class="text-xs font-medium">Zoo</span>
    </div>
    <InfoIcon
      class="size-4 text-muted-foreground group-hover:text-foreground"
    />
  </button>
</div>
