<script lang="ts">
  import ListRestart from "@lucide/svelte/icons/list-restart";

  import { Input } from "$lib/components/ui/input";
  import { Slider } from "$lib/components/ui/slider";
  import { Switch } from "$lib/components/ui/switch";
  import Tooltip from "$lib/components/ui/tooltip.svelte";
  import type {
    ButtonAction,
    CheckboxAction,
    DebugAction,
    DebugItem,
    SliderAction,
    TextAction,
  } from "$lib/types/events";
  import { IsEnvBrowser } from "$lib/utils/eventsHandlers";
  import { InitialiseDebugSenders } from "$lib/utils/debug/init";
  import { InitialiseDebugReceivers } from "$lib/utils/debug/receivers";
  import { createDebugSenders } from "$lib/utils/debug/senders";

  const isBrowser = IsEnvBrowser();

  if (import.meta.env.DEV && isBrowser) {
    InitialiseDebugSenders();
    InitialiseDebugReceivers();
  }

  let senders = $state<DebugItem[]>(createDebugSenders());

  function runTextAction(action: TextAction) {
    action.action(typeof action.value === "string" ? action.value : "");
  }

  function setTextValue(action: TextAction, value: string) {
    action.value = value;
  }

  function setCheckboxValue(action: CheckboxAction, value: boolean) {
    action.value = value;
    action.action(value);
  }

  function setSliderValue(action: SliderAction, value: number) {
    action.value = value;
    action.action(value);
  }
</script>

{#if import.meta.env.DEV && isBrowser}
  <div class="pointer-events-none absolute inset-y-0 left-0 z-50 flex items-start">
    <aside class="pointer-events-auto h-full w-96 overflow-hidden border-r bg-background">
      <div class="grid gap-4 p-4">
        {#each senders as sender (sender.label)}
          <div class="space-y-2">
            <h2 class="text-sm font-medium">{sender.label}</h2>

            {#each sender.actions ?? [] as action (`${sender.label}-${action.label}`)}
              {#if action.type === "checkbox"}
                <div class="flex items-center justify-between space-x-2">
                  <span class="text-sm font-medium text-muted-foreground">
                    {action.label}
                  </span>
                  <Switch checked={Boolean(action.value)} onChange={(value) => setCheckboxValue(action, value)} />
                </div>
              {:else if action.type === "slider"}
                <div class="space-y-1">
                  <div class="flex items-center justify-between gap-3">
                    <span class="text-sm font-medium text-muted-foreground">
                      {action.label}
                    </span>
                    <span class="text-xs text-muted-foreground">
                      {typeof action.value === "number" ? action.value : 0}
                    </span>
                  </div>
                  <Slider
                    value={typeof action.value === "number" ? action.value : 0}
                    min={action.min ?? 0}
                    max={action.max ?? 100}
                    step={action.step ?? 1}
                    onChange={(value) => setSliderValue(action, value)}
                  />
                </div>
              {:else if action.type === "text"}
                <div class="space-y-1">
                  <span class="text-sm font-medium text-muted-foreground">
                    {action.label}
                  </span>
                  <div class="flex gap-2">
                    <Input
                      class="flex-1 h-8!"
                      value={typeof action.value === "string" ? action.value : ""}
                      placeholder={action.placeholder}
                      onChange={(value) => setTextValue(action, value)}
                    />
                    <button
                      type="button"
                      class="bg-primary hover:bg-primary/80 text-primary-foreground flex h-8 w-full max-w-24 items-center justify-center rounded-lg outline-hidden select-none text-xs font-medium"
                      onclick={() => runTextAction(action)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              {:else if action.type === undefined || action.type === "button"}
                <div class="space-y-1">
                  <button
                    type="button"
                    class="bg-input/30 hover:bg-input/50 text-foreground flex h-8 w-full items-center justify-center rounded-lg border border-border outline-hidden select-none text-xs font-medium"
                    onclick={() => action.action()}
                  >
                    {action.label}
                  </button>
                </div>
              {/if}
            {/each}
          </div>
        {/each}
      </div>
    </aside>
  </div>
{/if}
