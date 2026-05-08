<script lang="ts">
  import { phone } from "$phone/state/phone.svelte";
  import { phoneApp } from "../../state/phone-app.svelte";

  function redial(number: string, name: string) {
    phone.telephony.startOutgoingCall({
      name,
      number,
    });
  }
</script>

<header class="flex items-center w-full mt-12 px-4 pb-3 border-b">
  <p class="font-medium text-sm">Recent Calls</p>
</header>

<div class="flex flex-col w-full h-[calc(100%-11.8rem)] overflow-y-auto">
  {#if phoneApp.recentCalls.length > 0}
    {#each phoneApp.recentCalls as call (call.id)}
      <button
        class="flex items-center justify-between w-full min-h-10 px-4 border-b hover:bg-secondary/20 disabled:opacity-50 text-left group"
        onclick={() => redial(call.number, call.name)}
      >
        <span class="block text-xs font-medium {call.direction === 'missed' ? 'text-destructive' : ''}">
          {call.name}
        </span>
        <span class="text-xs text-muted-foreground">{call.timestamp}</span>
      </button>
    {/each}
  {/if}
</div>
