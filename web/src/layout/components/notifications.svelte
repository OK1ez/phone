<script>
  import { NOTIFICATIONS } from "@/stores/notifications";
  import { fly } from "svelte/transition";
</script>

<div class="absolute z-50 flex flex-col items-center justify-between w-full p-4 space-y-4 mt-12">
  {#each $NOTIFICATIONS as notification}
    <div class="w-full h-20 rounded-2xl border bg-background p-4 flex items-center space-x-4" transition:fly={{ y: -20, duration: 300 }}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAHAKBMgyQ18-V1vQg6iGgGf1zmkic4FN6Cw&s"
        alt={notification.title}
        class="w-10 h-10 object-contain rounded-lg"
      />
      <div class="flex flex-col items-start justify-center">
        <div class="text-base font-semibold">{notification.title}</div>
        <div class="text-base text-gray-400">{notification.body}</div>
      </div>
    </div>
  {/each}
</div>
