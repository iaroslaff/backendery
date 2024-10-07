import { useEffect, useRef, useState } from "react"

/**
 * Type definition for rotation direction.
 * Can be either "left" for counterclockwise or "right" for clockwise.
 */
type RotateDirection = "left" | "right"

/**
 * Type definition for the useRotator hook's props.
 */
type UseRotatorProps = {
  /**
   * The angle of rotation in degrees
   */
  angle?: number

  /**
   * Direction of the rotation: "left" for counterclockwise, "right" for clockwise
   */
  direction?: RotateDirection

  /**
   * Duration of the rotation animation in milliseconds
   *
   */
  duration?: number

  /**
   * Optional flag to randomize both angle and direction of rotation
   * @default false
   */
  randomizeRotation?: boolean

  /**
   * Callback when animation starts rendering
   */
  onAnimationStart?: () => void

  /**
   * Callback for when the animation finished
   */
  onAnimationEnd?: () => void
}

export const useRotator = (props: UseRotatorProps) => {
  /* prettier-ignore */
  const {
    angle = 45,
    direction = "right",
    duration = 800,
    randomizeRotation = false,
    onAnimationStart,
    onAnimationEnd,
  } = props;

  /** refs */
  /** reference to track if the animation is currently running */
  const isAnimatingRef = useRef<boolean>(false)
  /** reference to the DOM element to apply rotation */
  const nodeRef = useRef<HTMLDivElement | null>(null)
  /** reference for canceling the animation frame */
  const rafRef = useRef<number | null>(null)

  /** states */
  /** current angle storage */
  const [currentAngle, setCurrentAngle] = useState<number>(0)

  /** function to trigger the rotation animation */
  const play = () => {
    /** exit if the node is not defined or if animation is already in progress */
    if (!nodeRef.current || isAnimatingRef.current) return

    /** set the animation flag to true and call the start callback */
    isAnimatingRef.current = true
    onAnimationStart && onAnimationStart()

    /** determine the angle and direction for the rotation */
    const [updatedAngle, updatedDirection] = randomizeRotation
      ? [Math.floor(Math.random() * 4) * 90, Math.random() > 0.5 ? "left" : "right"]
      : [angle, direction]

    /** calculate the rotation value based on direction */
    const rotateValue = updatedDirection === "left" ? -updatedAngle : updatedAngle

    /** calculate the new angle by adding the current angle to the new rotation value */
    const newAngle = currentAngle + rotateValue

    const startTime = performance.now() // get the current timestamp

    /** animation function to be called on each frame */
    const animate = (time: number) => {
      /** calculate the elapsed time */
      const elapsed = time - startTime
      /** normalize the progress of the animation (0 - 1) */
      const progress = Math.min(elapsed / duration, 1)
      /** calculate the current rotation based on the progress */
      const currentRotation = currentAngle + rotateValue * progress

      /** apply the current rotation to the element */
      if (nodeRef.current) {
        nodeRef.current.style.transform = `rotate(${currentRotation}deg)`
      }

      /** if the animation is not complete, request the next frame */
      if (progress < 1.0) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        /** animation completed, reset the animating flag and call the end callback */
        isAnimatingRef.current = false

        /** normalize angle to keep it within 0-360 range */
        setCurrentAngle(newAngle % 360)

        onAnimationEnd && onAnimationEnd()
      }
    }

    /** run the animation */
    rafRef.current = requestAnimationFrame(animate)
  }

  /** effect to run on component mount */
  useEffect(() => {
    play() // start animation when the component mounts

    return () => {
      /** clean up on component unmount */
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current) // cancel any ongoing animation frame
      }
      isAnimatingRef.current = false // reset animation flag
    }
  }, [])

  /** return the ref to the element and the replay function for external use */
  return { ref: nodeRef, replay: play }
}
