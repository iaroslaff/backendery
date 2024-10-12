import { motion } from "framer-motion"
import { FC, useEffect, useRef, useState } from "react"

/**
 * Type definition for marquee direction.
 * Can be either "left" for counterclockwise or "right" for clockwise.
 */
type MarqueeDirection = "left" | "right"

/**
 * Define the props for the `Marquee` component.
 */
interface IMarqueeProps {
  /**
   * @property {string} Text to be displayed in the moving string.
   */
  text: string

  /**
   * @property {number} Speed of string movement. The larger the value, the slower the movement will be.
   * @default 50
   */
  speed?: number

  /**
   * @property {MarqueeDirection} Direction of the marquee.
   * @default "left"
   */
  direction?: MarqueeDirection
}

/**
 * `Marquee` component that creates a scrolling text animation, where the text moves either
 * to the left or right in a continuous loop.
 *
 * This component accepts a string of text and animates it within a container. The speed and
 * direction of the animation are customizable. The component ensures that the text width is
 * dynamically calculated to determine the appropriate scroll duration, providing a smooth
 * and continuous scrolling effect.
 *
 * Behavior:
 * - The marquee can scroll left or right, depending on the `direction` prop.
 * - The speed of the scroll is adjustable via the `speed` prop.
 * - It uses Framer Motion for smooth, performant animations.
 * - The width of both the text and the container are dynamically measured to calculate the
 *   proper scroll duration.
 *
 * @example
 * ```tsx
 * <Marquee text="Scrolling text" speed={70} direction="left" />
 * ```
 */
const Marquee: FC<IMarqueeProps> = props => {
  const { text, speed = 50, direction = "left" } = props

  /** @states */
  const [containerWidth, setContainerWidth] = useState<number>(0) // Holds the container width for calculating scroll distance
  const [textWidth, setTextWidth] = useState<number>(0) // Holds the text width for calculating scroll distance

  /** @references */
  const containerRef = useRef<HTMLDivElement | null>(null) // Ref to the container div for measuring its width
  const textRef = useRef<HTMLDivElement | null>(null) // Ref to the text div for measuring the text width

  // Determining the direction of movement
  const xValues =
    direction === "left"
      ? ["100%", `-${textWidth + containerWidth}px`] // Move left
      : [`-${textWidth + containerWidth}px`, "0%"] // Move right

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      // Find out the width of the text and the container
      setTextWidth(textRef.current.offsetWidth)
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [text])

  return (
    <div ref={containerRef} style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <motion.div
        ref={textRef}
        animate={{ x: xValues }} // Move the string depending on the direction
        transition={{
          repeat: Infinity,
          duration: (textWidth + containerWidth) / speed, // Adjust speed based on both widths
          ease: "linear",
        }}
      >
        {text}
      </motion.div>
    </div>
  )
}

export default Marquee
