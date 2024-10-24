<script lang="ts">
  import { cn } from "@/utils/misc";

  
  interface Props {
    class?: string | undefined;
    orientation?: "vertical" | "horizontal" | "both";
    scrollbarXClasses?: string;
    scrollbarYClasses?: string;
    children?: import('svelte').Snippet;
  }

  let {
    class: className = undefined,
    orientation = "vertical",
    scrollbarXClasses = "",
    scrollbarYClasses = "",
    children
  }: Props = $props();

  let viewportEl: HTMLDivElement = $state();

  function handleScroll() {
    if (viewportEl) {
      const {
        scrollTop,
        scrollLeft,
        clientHeight,
        clientWidth,
        scrollHeight,
        scrollWidth,
      } = viewportEl;
      const verticalThumbHeight = (clientHeight / scrollHeight) * 100;
      const horizontalThumbWidth = (clientWidth / scrollWidth) * 100;

      if (orientation === "vertical" || orientation === "both") {
        const verticalScrollbar = viewportEl.querySelector(
          ".scrollbar-vertical",
        );
        if (verticalScrollbar) {
          const thumb = verticalScrollbar.querySelector("div");
          if (thumb) {
            thumb.style.height = `${verticalThumbHeight}%`;
            thumb.style.top = `${(scrollTop / scrollHeight) * 100}%`;
          }
        }
      }

      if (orientation === "horizontal" || orientation === "both") {
        const horizontalScrollbar = viewportEl.querySelector(
          ".scrollbar-horizontal",
        );
        if (horizontalScrollbar) {
          const thumb = horizontalScrollbar.querySelector("div");
          if (thumb) {
            thumb.style.width = `${horizontalThumbWidth}%`;
            thumb.style.left = `${(scrollLeft / scrollWidth) * 100}%`;
          }
        }
      }
    }
  }
</script>

<div class={cn("relative overflow-hidden", className)}>
  <div
    bind:this={viewportEl}
    class="h-full w-full rounded-[inherit] overflow-auto"
    onscroll={handleScroll}
  >
    <div>
      {@render children?.()}
    </div>
  </div>
  {#if orientation === "horizontal" || orientation === "both"}
    <div class={cn("scrollbar-horizontal", scrollbarXClasses)}>
      <div></div>
    </div>
  {/if}
  {#if orientation === "vertical" || orientation === "both"}
    <div class={cn("scrollbar-vertical", scrollbarYClasses)}>
      <div></div>
    </div>
  {/if}
</div>
