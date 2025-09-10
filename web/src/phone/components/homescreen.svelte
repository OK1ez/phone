<script>
  import Background from "@/lib/assets/backgrounds/background.webp";

  import { phone } from "@/lib/states/phone.svelte";
</script>

<div
  class="absolute flex justify-center w-full h-full bg-cover pt-20"
  style="background-image: url({Background});"
>
  <div class="grid grid-cols-4 gap-x-4 gap-y-6 absolute">
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Phone</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
      onclick={() => phone.openApp("messages")}
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Messages</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Contacts</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
      onclick={() => phone.openApp("settings")}
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Settings</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">App Store</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
      onclick={() => phone.openApp("mail")}
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Email</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Bank</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Camera</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Documents</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Gallery</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Garage</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Bleeter</p>
    </button>
    <button
      class="flex flex-col items-center justify-center rounded-lg space-y-2"
    >
      <div
        class="size-[3.3rem] rounded-xl bg-secondary"
        style="background-image: url('');"
      ></div>
      <p class="text-center text-xs">Groups</p>
    </button>
  </div>
</div>
