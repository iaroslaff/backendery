import { motion } from "framer-motion"
import { FC, useEffect, useRef, useState } from "react"

/**
 * Type definition for marquee direction.
 * Can be either "left" for counterclockwise or "right" for clockwise.
 */
type MarqueeDirection = "left" | "right"

/**
 * Define the props for the `Marquee` component
 */
interface IMarqueeProps {
  /**
   * @property {string} Text to be displayed in the moving string
   */
  text: string

  /**
   * @property {number} Speed of string movement. The larger the value, the slower the movement will be
   * @default 50
   */
  speed?: number

  /**
   * @property {MarqueeDirection} Direction of the marquee
   * @default "left"
   */
  direction?: MarqueeDirection
}

const Marquee: FC<IMarqueeProps> = props => {
  /* prettier-ignore */
  const {
    text,
    speed = 50,
    direction = "left"
  } = props;

  /** refs */
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  /** states */
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [textWidth, setTextWidth] = useState<number>(0)

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      /** find out the width of the text and the container */
      setTextWidth(textRef.current.offsetWidth)
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [text])

  /** determining the direction of movement */
  const xValues =
    direction === "left"
      ? ["100%", `-${textWidth + containerWidth}px`] // move left
      : [`-${textWidth + containerWidth}px`, "0%"] // move right

  return (
    <div ref={containerRef} style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <motion.div
        ref={textRef}
        animate={{ x: xValues }} // move the string depending on the direction
        transition={{
          repeat: Infinity,
          duration: (textWidth + containerWidth) / speed, // adjust speed based on both widths
          ease: "linear",
        }}
      >
        {text}
      </motion.div>
    </div>
  )
}

export default Marquee
