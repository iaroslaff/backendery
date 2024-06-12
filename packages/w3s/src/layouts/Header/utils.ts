/* prettier-ignore */
export default function calcScrollingOffset(selector: string): number {
  const offset: number =
    parseInt(window
      .getComputedStyle(document.querySelector(selector) as Element)
      .getPropertyValue("padding-top")
  ) / 2

  return offset
}
