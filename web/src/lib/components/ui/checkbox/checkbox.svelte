<script lang="ts">
  import Check from 'lucide-svelte/icons/check';
  import Minus from 'lucide-svelte/icons/minus';

  interface CheckboxProps {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    class?: string;
    name?: string;
    onChange?: (value: boolean) => void;
  }

  let { checked = $bindable(false), onChange = (value: boolean) => {}, indeterminate = false, disabled = false, class: className = undefined, name = undefined, ...rest }: CheckboxProps = $props();

  function handleClick() {
    if (!disabled) {
      checked = !checked;
      onChange(checked);
    }
  }
</script>

<div class="relative">
  <button
    type="button"
    role="checkbox"
    aria-checked={indeterminate ? "mixed" : checked}
    aria-disabled={disabled}
    data-state={checked ? "checked" : "unchecked"}
    data-disabled={disabled}
    onclick={handleClick}
    class="{className} data-[state=checked]:bg-primary bg-background data-[state=checked]:text-primary-foreground peer box-content size-4 shrink-0 rounded-sm border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
    {...rest}
  >
    <div class="flex size-4 items-center justify-center text-current">
      {#if indeterminate}
        <Minus class="size-3.5" />
      {:else}
        <Check class="size-3.5 {!checked && 'text-transparent'}" />
      {/if}
    </div>
  </button>

  {#if name}
    <input type="hidden" {name} value={checked ? "true" : "false"} />
  {/if}
</div>
