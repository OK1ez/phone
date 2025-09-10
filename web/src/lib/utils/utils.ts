export function turncate(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "..";
  }
  return str;
}

export function getTransitionDirection(direction: "forward" | "back") {
  const sign = direction === "forward" ? 1 : -1;
  return {
    in: { x: 500 * sign, duration: 250 },
    out: { x: -500 * sign, duration: 250 },
  };
}

// taken form ox_lib
// https://github.com/project-error/npwd/blob/d8dc5b7f47faf5fc581ffee30f31ff61d184cfe7/phone/src/os/phone/hooks/useClipboard.ts#L1
export function setClipboard(text: string) {
  const clipElem = document.createElement("textarea");
  clipElem.value = text;
  document.body.appendChild(clipElem);
  clipElem.select();
  document.execCommand("copy");
  document.body.removeChild(clipElem);
}
