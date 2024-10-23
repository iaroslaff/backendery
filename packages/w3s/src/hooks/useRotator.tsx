import { useEffect, useRef, useState } from "react"

/**
 * Type definition for rotation direction.
 * Can be either "left" for counterclockwise or "right" for clockwise.
 */
type RotateDirection = "left" | "right"

/**
 * Type definition for the `useRotator` hook's props.
 */
type UseRotatorProps = {
  /**
   * @property {number} The angle of rotation in degrees.
   * @default 45
   */
  angle?: number

  /**
   * @property {RotateDirection} Direction of the rotation.
   * @default "right"
   */
  direction?: RotateDirection

  /**
   * @property {number} Duration of the rotation animation in milliseconds.
   * @default 800
   */
  duration?: number

  /**
   * @property {boolean} Flag to randomize both angle and direction of rotation.
   * @default false
   */
  randomizeRotation?: boolean

  /**
   * @property {Function} Callback when animation starts rendering.
   * @default null
   */
  onAnimationStart?: () => void

  /**
   * @property {Function} Callback for when the animation finished.
   * @default null
   */
  onAnimationEnd?: () => void
}

/**
 * A custom hook that provides an animated rotation effect on a DOM element.
 * The element can rotate by a specified angle, with optional randomization of rotation direction and angle.
 *
 * @returns {Object} - An object containing:
 *   - `ref`: A reference to the DOM element that will be rotated.
 *   - `replay`: A function to trigger the rotation animation manually.
 *
 * @example
 * ```tsx
 * const { ref, replay } = useRotator({ angle: 90, direction: "left" });
 *
 * return(
 *  ...
 *  <div ref={ref} onClick={replay}>Rotating Element</div>
 *  ...
 * )
 * ```
 */
export const useRotator = (props: UseRotatorProps) => {
  const {
    angle = 45,
    direction = "right",
    duration = 800,
    randomizeRotation = false,
    onAnimationStart,
    onAnimationEnd,
  } = props

  /**
   * Trigger the rotation animation.
   * @function
   */
  const play = () => {
    // Exit if the node is not defined or if animation is already in progress
    if (!nodeRef.current || isAnimatingRef.current) return

    // Set the animation flag to true and call the start callback
    isAnimatingRef.current = true
    onAnimationStart && onAnimationStart()

    // Determine the angle and direction for the rotation
    const [updatedAngle, updatedDirection] = randomizeRotation
      ? [Math.floor(Math.random() * 4) * 90, Math.random() > 0.5 ? "left" : "right"]
      : [angle, direction]

    // Calculate the rotation value based on direction
    const rotateValue = updatedDirection === "left" ? -updatedAngle : updatedAngle

    // Calculate the new angle by adding the current angle to the new rotation value
    const newAngle = currentAngle + rotateValue

    const startTime = performance.now()

    // Animation function to be called on each frame
    const animate = (time: number) => {
      // Calculate the elapsed time
      const elapsed = time - startTime
      // Normalize the progress of the animation (0 - 1)
      const progress = Math.min(elapsed / duration, 1)
      // Calculate the current rotation based on the progress
      const currentRotation = currentAngle + rotateValue * progress

      // Apply the current rotation to the element
      if (nodeRef.current) {
        nodeRef.current.style.transform = `rotate(${currentRotation}deg)`
      }

      // If the animation is not complete, request the next frame
      if (progress < 1.0) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        // Animation completed, reset the animating flag and call the end callback
        isAnimatingRef.current = false

        // Normalize angle to keep it within 0-360 range
        setCurrentAngle(newAngle % 360)

        onAnimationEnd && onAnimationEnd()
      }
    }

    // Run the animation
    rafRef.current = requestAnimationFrame(animate)
  }

  /** @states */
  const [currentAngle, setCurrentAngle] = useState<number>(0) // Current angle storage

  /** @references */
  const isAnimatingRef = useRef<boolean>(false) // Ref to track if the animation is currently running
  const nodeRef = useRef<HTMLDivElement | null>(null) // Ref to the DOM element to apply rotation
  const rafRef = useRef<number | null>(null) // Ref for canceling the animation frame

  useEffect(() => {
    play() // Start animation when the component mounts

    return () => {
      // Clean up on component unmount
      if (rafRef.current) {
        // Cancel any ongoing animation frame
        cancelAnimationFrame(rafRef.current)
      }
      isAnimatingRef.current = false // Reset animation flag
    }
  }, [])

  // Return the ref to the element and the replay function for external use
  return { ref: nodeRef, replay: play }
}
