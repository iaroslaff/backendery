import React, { FC, useEffect, useMemo, useRef, useState } from "react"

import "./StdoutRow.scss"

interface IStdoutRowProps {
  /**
   * @property { string } The main text string to be displayed.
   */
  text: string

  /**
   * @property {string} Optional string used as the filler character.
   * @default '.'
   */
  filler?: string

  /**
   * @property {number} Optional number of pixels per filler character.
   * @default 8
   */
  fillerWidth?: number

  /**
   * @property {React.CSSProperties} Optional inline styles to be applied to the grid container, allowing
   * customization of grid appearance.
   */
  style?: React.CSSProperties
}

/**
 * The `StdoutRow` component displays a single string with dynamically calculated filler characters
 * based on the width of the container. It recalculates the number of fillers when the container size changes
 * (using the `ResizeObserver` API) or when the content changes.
 *
 * @component
 * @param {string} text - The primary text string to be displayed.
 * @param {string} [filler='.'] - An optional filler character (or string) used to fill the space.
 * @param {number} [fillerWidth=8] - An optional number that specifies how many pixels each filler character takes up.
 * @param {React.CSSProperties} [style] An optional inline CSS styles to apply to the element. This allows for customizing
 * visual properties such as font size, color, or spacing.
 *
 * @example
 * ```tsx
 *   <div>
 *     ...
 *     <StdoutRow text="Continuous learning" filler="-" fillerWidth={6} />
 *     ...
 *   </div>
 * ```
 *
 * @remarks
 * - The component dynamically adjusts the number of filler characters based on the width of the container.
 * - It is useful for maintaining consistent visual alignment between different elements in a responsive layout.
 *
 * @returns {JSX.Element} Returns JSX markup for displaying the text with dynamically calculated filler characters.
 */

const StdoutRow: FC<IStdoutRowProps> = React.memo(({ text, filler = ".", fillerWidth = 8, style = {} }) => {
  /**
   * Calculate the number of filler characters based on the container's width.
   * @param {number} elementWidth - The width of the container in pixels.
   * @returns {number} Number of filler characters that fit in the container.
   */
  const calculateFillerCount = (elementWidth: number): number => {
    // Number of fillers that fit within the container width
    return Math.floor(elementWidth / fillerWidth)
  }

  /**
   * Handles resizing of the container and recalculates the number of filler characters
   * based on the new width of the container.
   */
  const handleResizeViewport = () => {
    if (containerRef.current) {
      // Get the container width
      const width = containerRef.current.offsetWidth
      // Calculate the new number of fillers
      const calculatedFillerCount = calculateFillerCount(width)
      // Update state with the new filler count
      setFillerCount(calculatedFillerCount)
    }
  }

  /** @states */
  // State to store the calculated number of filler characters
  const [fillerCount, setFillerCount] = useState<number>(0)

  /** @references */
  // Ref to access the container element directly
  const containerRef = useRef<HTMLDivElement | null>(null)

  /** @memos */
  // Memoized filler string to avoid unnecessary re-renders when fillerCount remains unchanged
  const memoizedFiller = useMemo(() => filler.repeat(fillerCount), [fillerCount, filler])

  useEffect(() => {
    // Using the ResizeObserver API to watch for container size changes
    const resizeObserver = new ResizeObserver(handleResizeViewport) // Observe changes in container size
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Initial calculation on component mount
    handleResizeViewport()

    // Clean up the observer on component unmount
    return () => resizeObserver.disconnect()
  }, [text, fillerWidth])

  return (
    <div className='stdout-row' style={{ ...style }}>
      <p>{text}</p>
      <div className='stdout-row__filler-wrapper' ref={containerRef}>
        <p className='stdout-row__filler'>{memoizedFiller}</p>
      </div>
      <p>
        {"[ "}
        <span className='stdout-row__status--success'>{"ok"}</span>
        {" ]"}
      </p>
    </div>
  )
})

export default StdoutRow
