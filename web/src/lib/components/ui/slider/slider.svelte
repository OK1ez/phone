<script lang="ts">
  import { Input } from "@/lib/components/ui/input";

  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    class: className = undefined,
    onChange = (value: number) => {},
  } = $props();

  let inputValue = $state(value.toString());
  let sliderValue = $state(value);
  let sliderTimeout: ReturnType<typeof setTimeout> | undefined;
  let rangeFillElement: HTMLElement;
  let previousValue = $state(value);

  $effect(() => {
    if (value !== previousValue) {
      sliderValue = value;
      inputValue = value.toString();
      previousValue = value;
    }

    const percentage = ((sliderValue - min) / (max - min)) * 100;
    if (rangeFillElement) {
      rangeFillElement.style.width = `${percentage}%`;
    }
  });

  $effect(() => {
    if (sliderTimeout) {
      clearTimeout(sliderTimeout);
    }
  });

  function updateValue(newValue: number) {
    clearTimeout(sliderTimeout);
    sliderTimeout = setTimeout(() => {
      onChange(newValue);
    }, 200);
  }

  function handleSliderChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).valueAsNumber;
    sliderValue = newValue;
    inputValue = newValue.toString();
    updateValue(newValue);
  }

  function handleInputChange(event: Event) {
    inputValue = (event.target as HTMLInputElement).value;
  }

  function validateAndUpdateValue() {
    let newValue = Number(inputValue);
    if (isNaN(newValue)) {
      newValue = value;
    } else {
      newValue = Math.max(min, Math.min(max, newValue));
    }

    sliderValue = newValue;
    inputValue = newValue.toString();
    updateValue(sliderValue);
  }
</script>

<div class="flex items-center gap-4 {className}">
  <div class="relative flex w-full touch-none select-none items-center">
    <span
      class="bg-secondary text-secondary-foreground relative h-2 w-full grow overflow-hidden rounded-full"
    >
      <span class="bg-primary absolute h-full" bind:this={rangeFillElement}
      ></span>
    </span>
    <input
      type="range"
      {min}
      {max}
      {step}
      value={sliderValue}
      oninput={handleSliderChange}
      class="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
    />
  </div>
  <Input
    class="h-8 max-w-[3.25rem] px-2 py-1"
    type="text"
    inputmode="decimal"
    value={inputValue}
    oninput={handleInputChange}
    onblur={validateAndUpdateValue}
    onkeydown={(e) => {
      if (e.key === "Enter") {
        validateAndUpdateValue();
      }
    }}
  />
</div>

<style>
  input[type="range"]::-webkit-slider-thumb {
    @apply appearance-none block h-3.5 w-3.5 rounded border-primary bg-background;
    @apply ring-1 ring-primary;
  }
</style>
