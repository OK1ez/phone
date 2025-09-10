<script>
  import { fly, fade } from "svelte/transition";

  let { title, children } = $props();
  let isHovered = $state(false);
  let containerRef;
  let hoverTimeout = $state(0);

  let tooltipContainer;

  $effect(() => {
    tooltipContainer = document.createElement("div");
    tooltipContainer.style.position = "absolute";
    tooltipContainer.style.top = "0";
    tooltipContainer.style.left = "0";
    tooltipContainer.style.width = "100%";
    tooltipContainer.style.height = "0";
    tooltipContainer.style.overflow = "visible";
    tooltipContainer.style.pointerEvents = "none";
    tooltipContainer.style.zIndex = "10000";
    document.body.appendChild(tooltipContainer);

    return () => {
      if (tooltipContainer && tooltipContainer.parentNode) {
        tooltipContainer.parentNode.removeChild(tooltipContainer);
      }
    };
  });

  function updateTooltipPosition() {
    if (!containerRef || !tooltipContainer) return;

    const rect = containerRef.getBoundingClientRect();

    const tooltipElement = tooltipContainer.firstChild;
    if (tooltipElement) {
      const tooltipRect = tooltipElement.getBoundingClientRect();
      tooltipElement.style.position = "fixed";
      tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
      tooltipElement.style.top = `${rect.top - tooltipRect.height - 7}px`;
      tooltipElement.style.transform = "translateX(-50%)";
    }
  }

  function handleMouseOver() {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    hoverTimeout = setTimeout(() => {
      isHovered = true;
      setTimeout(updateTooltipPosition, 0);
    }, 300);
  }

  function handleMouseLeave() {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    isHovered = false;
  }

  $effect(() => {
    if (isHovered) {
      window.addEventListener("scroll", updateTooltipPosition, true);
      window.addEventListener("resize", updateTooltipPosition);

      updateTooltipPosition();
      const interval = setInterval(updateTooltipPosition, 100);

      return () => {
        window.removeEventListener("scroll", updateTooltipPosition, true);
        window.removeEventListener("resize", updateTooltipPosition);
        clearInterval(interval);
      };
    }
  });

  $effect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  });

  function renderTooltip() {
    if (!isHovered || !tooltipContainer) return;

    const tooltipElement = document.createElement("div");
    tooltipElement.className =
      "tooltip-content px-3 py-1.5 text-sm bg-popover border text-popover-foreground rounded-md shadow-md";
    tooltipElement.innerText = title;
    tooltipElement.style.position = "fixed";
    tooltipElement.style.zIndex = "10000";
    tooltipElement.style.pointerEvents = "none";

    tooltipContainer.innerHTML = "";

    tooltipContainer.appendChild(tooltipElement);

    updateTooltipPosition();

    return () => {
      if (tooltipContainer) {
        tooltipContainer.innerHTML = "";
      }
    };
  }

  $effect(renderTooltip);
</script>

<div
  bind:this={containerRef}
  class="relative"
  onmouseover={handleMouseOver}
  onmouseleave={handleMouseLeave}
>
  {@render children?.()}
</div>
