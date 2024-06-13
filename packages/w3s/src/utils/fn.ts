/* prettier-ignore */
export function calcScrollingOffset(selector: string): number {
  const elt = document.querySelector(selector) as Element
  if (!elt) {
    throw new Error("the specified selector could not be found")
  }

  const offset: number = parseInt(
    window.getComputedStyle(elt).getPropertyValue("padding-top")
  ) / 2

  return offset
}
