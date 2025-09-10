<script lang="ts">
  interface Props {
    checked?: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
    class?: string | undefined;
  }

  let {
    checked = $bindable(false),
    onChange = (value: boolean) => {},
    disabled = false,
    class: className = undefined,
    ...rest
  }: Props = $props();

  function toggle() {
    if (!disabled) {
      checked = !checked;
      onChange(checked);
    }
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-label={checked ? "On" : "Off"}
  {disabled}
  class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring/20 {checked
    ? 'bg-primary'
    : 'bg-input'} {className}"
  onclick={(e) => {
    e.stopPropagation();
    toggle();
  }}
  {...rest}
>
  <span
    class="bg-background pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform {checked
      ? 'translate-x-[1rem]'
      : 'translate-x-0'}"
  ></span>
</button>
