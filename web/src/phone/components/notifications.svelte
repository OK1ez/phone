<script lang="ts">
  import { flip } from "svelte/animate";
  import { cubicInOut, quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import PhoneOff from "@lucide/svelte/icons/phone-off";

  import { phone } from "$phone/state/phone.svelte";
  import { notifications } from "$phone/state/notifications.svelte";

  let showActiveCall = $derived(phone.telephony.status !== "idle" && phone.telephony.currentCall !== null);
  let activeCallParticipant = $derived(phone.telephony.currentCall?.participant ?? null);
</script>

{#if notifications?.items?.length > 0 || showActiveCall}
  <div class="absolute inset-x-0 z-50 px-3">
    <div class="absolute inset-x-0 flex justify-center top-3">
      <div class="flex w-full max-w-76 flex-col items-center gap-2">
        {#if showActiveCall && activeCallParticipant}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_missing_attribute -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <a
            class={[
              "cursor-pointer relative flex overflow-hidden border border-border/40 bg-background transition-[width,height,border-radius,padding,background-color,box-shadow] duration-200 ease-out",
              notifications.compactCall
                ? "h-6 w-16 items-center justify-center rounded-[999px]"
                : "h-14 w-full items-center gap-3 rounded-[1.45rem] px-3",
            ]}
            in:fly|global={{ y: -18, duration: 320, opacity: 0, easing: quintOut }}
            out:fly|global={{ y: -12, duration: 100, opacity: 0, easing: cubicInOut }}
            onclick={() => notifications.toggleCompactCall()}
          >
            <span
              class={[
                "absolute inset-0 flex items-center justify-center transition-all duration-150",
                notifications.compactCall
                  ? "scale-100 opacity-100 delay-200"
                  : "pointer-events-none scale-95 opacity-0",
              ]}
            >
              <span class="truncate text-[10px] font-medium tabular-nums select-none">00:00</span>
            </span>

            <span
              class={[
                "flex min-w-0 flex-1 items-center gap-3 text-left transition-all duration-100 select-none",
                notifications.compactCall
                  ? "pointer-events-none scale-100 opacity-0"
                  : "scale-100 opacity-100 delay-100 select-none",
              ]}
            >
              {#if activeCallParticipant.avatar}
                <img
                  src={activeCallParticipant.avatar}
                  alt={activeCallParticipant.name}
                  class="size-8 shrink-0 rounded-[1.65rem] object-cover"
                />
              {:else}
                <div
                  class="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold"
                >
                  {activeCallParticipant?.name?.charAt(0) ?? "#"}
                </div>
              {/if}

              <div class="min-w-0">
                <p class="truncate text-[10px] font-medium tabular-nums">00:00</p>
                <p class="truncate text-xs">
                  {activeCallParticipant.name ? activeCallParticipant.name : activeCallParticipant.number}
                </p>
              </div>
            </span>

            <button
              class={[
                "flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive transition-all duration-150 hover:bg-destructive/25",
                notifications.compactCall
                  ? "pointer-events-none scale-95 opacity-0"
                  : "scale-100 opacity-100 delay-150",
              ]}
              aria-label="Hang up"
              onclick={() => phone.telephony.endCall()}
            >
              <PhoneOff class="size-3.5" />
            </button>
          </a>
        {/if}

        {#if notifications?.items?.length > 0}
          {#each notifications.items as notification (notification.id)}
            <button
              class="h-14 flex w-full transform-gpu flex-col justify-center rounded-[1.2rem] border border-border/50 bg-background px-3.5 text-left backdrop-blur-2xl will-change-transform"
              animate:flip={{ duration: 200, easing: cubicInOut }}
              in:fly|global={{ y: -18, duration: 320, opacity: 0, easing: quintOut }}
              out:fly|global={{ y: -12, duration: 100, opacity: 0, easing: cubicInOut }}
              onclick={() => notifications.dismiss(notification.id)}
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-xs">
                    {notification.title}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {notification.body}
                  </p>
                </div>
              </div>
            </button>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}
