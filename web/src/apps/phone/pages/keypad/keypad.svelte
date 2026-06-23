<script lang="ts">
  import Delete from "@lucide/svelte/icons/delete";
  import PhoneCall from "@lucide/svelte/icons/phone-call";

  import { calls } from "$phone/state/calls.svelte";

  type KeypadKey =
    | { kind: "digit"; label: string; value: string }
    | { kind: "call"; label: string }
    | { kind: "delete"; label: string };

  const keypadKeys: KeypadKey[] = [
    { kind: "digit", label: "1", value: "1" },
    { kind: "digit", label: "2", value: "2" },
    { kind: "digit", label: "3", value: "3" },

    { kind: "digit", label: "4", value: "4" },
    { kind: "digit", label: "5", value: "5" },
    { kind: "digit", label: "6", value: "6" },

    { kind: "digit", label: "7", value: "7" },
    { kind: "digit", label: "8", value: "8" },
    { kind: "digit", label: "9", value: "9" },

    { kind: "call", label: "Call" },
    { kind: "digit", label: "0", value: "0" },
    { kind: "delete", label: "Delete" },
  ];

  let phoneNumber = $state("");
  let canCall = $derived(/^\d{8}$/.test(phoneNumber));

  function handleKey(key: KeypadKey): void {
    if (key.kind === "digit") {
      if (phoneNumber.length < 8) {
        phoneNumber += key.value;
      }

      return;
    }

    if (key.kind === "delete") {
      phoneNumber = phoneNumber.slice(0, -1);
      return;
    }

    if (!canCall) {
      return;
    }

    void calls.startOutgoingCall({
      name: "",
      number: phoneNumber,
    });
  }
</script>

<div
  class="mt-12 flex min-h-32 w-full max-w-[20rem] items-center justify-center px-4 text-center text-2xl font-medium tracking-widest"
>
  {phoneNumber || "Enter number"}
</div>

<div class="mx-auto mt-10 grid w-fit grid-cols-3 justify-items-center gap-x-8 gap-y-4">
  {#each keypadKeys as key (key.label)}
    <button
      type="button"
      class={[
        "flex size-16 items-center justify-center rounded-full text-2xl font-medium transition-colors hover:bg-secondary/80 disabled:cursor-not-allowed disabled:opacity-40",
        key.kind === "call" ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25" : "",
      ]}
      aria-label={key.label}
      disabled={key.kind === "call" && !canCall}
      onclick={() => handleKey(key)}
    >
      {#if key.kind === "call"}
        <PhoneCall class="size-6" />
      {:else if key.kind === "delete"}
        <Delete class="size-6" />
      {:else}
        {key.label}
      {/if}
    </button>
  {/each}
</div>
