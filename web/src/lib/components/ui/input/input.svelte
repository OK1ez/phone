<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    type = $bindable("text"),
    min = $bindable(null),
    max = $bindable(null),
    disabled = $bindable(false),
    onChange = (value: string) => {},
    oninput,
    onblur,
    ...restProps
  } = $props<
    HTMLInputAttributes & {
      ref?: HTMLInputElement | null;
      onChange?: (value: string) => void;
    }
  >();

  let inputTimeout: number | null = null;

  function validateValue() {
    if (type === "number") {
      if (value === "" || value === null || value === undefined) {
        return;
      }

      if (min !== null && value < min) {
        value = min;
      } else if (max !== null && value > max) {
        value = max;
      }
    }
  }

  function handleInput(event: Event) {
    if (inputTimeout !== null) {
      clearTimeout(inputTimeout);
    }

    inputTimeout = setTimeout(() => {
      validateValue();
      if (
        onChange &&
        !(
          type === "number" &&
          (value === "" || value === null || value === undefined)
        )
      ) {
        onChange(value);
      }
    }, 500) as unknown as number;

    if (oninput) {
      oninput(event);
    }
  }

  function handleBlur(event: FocusEvent) {
    validateValue();
    if (
      onChange &&
      !(
        type === "number" &&
        (value === "" || value === null || value === undefined)
      )
    ) {
      onChange(value);
    }
    if (onblur) {
      onblur(event);
    }
  }
</script>

<input
  bind:this={ref}
  class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring/20 {className}"
  bind:value
  {type}
  {min}
  {max}
  {disabled}
  {...restProps}
  onblur={handleBlur}
  oninput={handleInput}
/>
