<script lang="ts">
  import Delete from "@lucide/svelte/icons/delete";
  import PhoneCall from "@lucide/svelte/icons/phone-call";

  import { phone } from "$phone/state/phone.svelte";
  import { phoneApp } from "../../state/phone-app.svelte";

  const keypadRows = [
    [
      { label: "1", digit: "1" },
      { label: "2", digit: "2" },
      { label: "3", digit: "3" },
    ],
    [
      { label: "4", digit: "4" },
      { label: "5", digit: "5" },
      { label: "6", digit: "6" },
    ],
    [
      { label: "7", digit: "7" },
      { label: "8", digit: "8" },
      { label: "9", digit: "9" },
    ],
    [
      { label: "*", disabled: true },
      { label: "0", digit: "0" },
      { label: "#", disabled: true },
    ],
  ];
</script>

<div class="flex h-[calc(100%-11.8rem)] flex-col items-center px-4 mt-12">
  <div
    class="flex min-h-14 w-full max-w-[20rem] items-center justify-center px-4 text-center text-2xl font-medium tracking-widest"
  >
    12323322
  </div>

  <div class="flex w-full flex-1 flex-col items-center mt-9">
    <div class="flex flex-1 items-center justify-center">
      <div class="grid w-fit grid-cols-3 gap-4">
        {#each keypadRows as row (row.map((key) => key.label).join(""))}
          {#each row as key (key.label)}
            <button
              class={[
                "flex size-16 items-center justify-center rounded-full text-2xl font-medium transition-colors",
                key.disabled ? "bg-secondary hover:bg-secondary/80" : "bg-secondary hover:bg-secondary/80",
              ]}
              aria-label={key.disabled ? `${key.label} unavailable` : `Dial ${key.label}`}
            >
              {key.label}
            </button>
          {/each}
        {/each}
      </div>
    </div>

    <div class="flex w-fit grid-cols-2 gap-4 pt-4">
      <button
        class="flex w-36 h-16 items-center justify-center rounded-full bg-emerald-500 text-white transition-colors hover:bg-emerald-500/90 disabled:opacity-50"
        aria-label="Start call"
      >
        <PhoneCall class="size-6" />
      </button>
      <button
        class="flex size-16 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80 disabled:opacity-50"
        aria-label="Delete digit"
      >
        <Delete class="size-6" />
      </button>
    </div>
  </div>
</div>
