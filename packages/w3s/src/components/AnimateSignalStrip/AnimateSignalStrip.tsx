import { motion } from "framer-motion"
import React, { FC, useEffect, useState } from "react"

import { randomBetween } from "../../utils/fn"

/**
 * Define the props for the `AnimateSignalStrip` component.
 */
interface IAnimateSignalStripProps {
  /**
   * @property {string} symbol A single character or symbol to animate in the strip. This symbol will
   * repeat and form the visual signal strip. The component will validate that only one character is provided.
   */
  symbol: string

  /**
   * @property {number} maxNumberOfSymbols The maximum number of symbols that can be displayed in the strip at
   * any given time. The component will dynamically grow or shrink the strip, but it will not exceed this number
   * of symbols.
   */
  maxNumberOfSymbols: number

  /**
   * @property {number} minInterval The minimum interval (in milliseconds) for updating the strip. This
   * determines the shortest amount of time between adding or removing symbols from the strip.
   */
  minInterval: number

  /**
   * @property {number} maxInterval The maximum interval (in milliseconds) for updating the strip. This
   * value represents the longest possible delay between changes in the strip’s length. The actual interval
   * will be randomly selected between `minInterval` and `maxInterval`.
   */
  maxInterval: number

  /**
   * @property {string} [initialSymbols] An optional string representing the initial set of symbols to
   * display when the component first renders. If provided, the string will be truncated to `maxNumberOfSymbols`
   * if it's longer than the allowed number. If not provided, the strip will start with an empty or default state.
   */
  initialSymbols?: string

  /**
   * @property {React.CSSProperties} [style] Optional inline CSS styles to apply to the component’s `<p>` element.
   * This allows for customizing visual properties such as font size, color, or spacing.
   */
  style?: React.CSSProperties
}

/**
 * `AnimateSignalStrip` is a React functional component that creates an animated strip of a single symbol.
 * The strip can dynamically grow or shrink in length over time, randomly adding or removing symbols at
 * specified intervals. This component leverages the Framer Motion library to animate the strip.
 *
 * Behavior:
 * - The component initializes with either the provided `initialSymbols` or an empty string.
 * - It continuously animates the symbols by adding or removing random quantities of the `symbol`, as long
 *   as the total number of symbols stays between 1 and `maxNumberOfSymbols`.
 * - The component sets an interval that triggers this animation, with the interval duration randomly selected
 *   between `minInterval` and `maxInterval`.
 * - The Framer Motion `motion.p` element is used to smoothly animate the strip with a repeating transition,
 *   where the duration is based on `minInterval`.
 * - The animation persists as long as the component is mounted, and the interval is cleared upon unmounting.
 *
 * @example
 * ```tsx
 * <AnimateSignalStrip
 *   symbol="*"
 *   maxNumberOfSymbols={10}
 *   minInterval={500}
 *   maxInterval={2000}
 *   initialSymbols="***"
 *   style={{ fontSize: "24px", color: "green" }}
 * />
 * ```
 */
const AnimateSignalStrip: FC<IAnimateSignalStripProps> = props => {
  /**
   * Animate symbols.
   * @function
   */
  const animateSymbols = () => {
    const currentLength = symbols.length // Current number of symbols

    // Conditions for adding or removing symbols
    const canAdd = currentLength < props.maxNumberOfSymbols // Can we add more symbols?
    const canRemove = currentLength > 1 // Can we remove symbols? (at least 1 symbol must remain)

    // Ensure we don't try to add more symbols than allowed
    const maxRandomCount = canAdd ? props.maxNumberOfSymbols - currentLength : currentLength - 1 // Max number of symbols we can add
    const randomCount = Math.floor(Math.random() * maxRandomCount) + 1 // Adding 1 to guarantee at least one addition or removal

    // Determine whether to add or remove symbols
    const isAdding = canAdd && Math.random() < 0.5 // Randomly choose to add symbols
    if (isAdding) {
      /**
       * - If we decide to add symbols
       * - Determine the number of symbols to add
       */
      const countToAdd = Math.min(randomCount, props.maxNumberOfSymbols - currentLength)
      // Update the state by adding symbols
      setSymbols(prevSeqSymbols => prevSeqSymbols + props.symbol.repeat(countToAdd))
    } else if (canRemove) {
      /**
       * - If we decide to remove symbols
       * - Determine the number of symbols to remove
       */
      const countToRemove = Math.min(randomCount, currentLength - 1) // Keep at least 1 symbol
      // Update the state by removing symbols
      setSymbols(prevSeqSymbols => prevSeqSymbols.slice(0, currentLength - countToRemove))
    }
  }

  /** @states */
  const [symbols, setSymbols] = useState<string>(props.initialSymbols ?? props.symbol) // Stores the symbols that will be animated

  // Synchronize duration with minimum interval
  const duration = props.minInterval / 1_000

  useEffect(() => {
    // Set an interval for animating symbols
    const interval = setInterval(animateSymbols, randomBetween(props.minInterval, props.maxInterval))

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval)
  }, [symbols, props.symbol, props.maxNumberOfSymbols, props.minInterval, props.maxInterval])

  return (
    <motion.p style={{ ...props.style }} transition={{ duration: duration, repeat: Infinity }}>
      {symbols}
    </motion.p>
  )
}

export default AnimateSignalStrip
