import { FC, useEffect, useMemo, useRef, useState } from "react"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import { useRotator } from "../../../hooks/useRotator"
import { randomBetween, randomChars, runWithTimeout } from "../../../utils/fn"

import "./Steps.scss"

interface IStdoutProps {
  highlights: string[]
  filler?: string
  pixelsPerFiller?: number
}

/**
 * The `Stdout` is a React functional component that displays a list of items (e.g., values,
 * services) with a dynamically adjusted number of filler characters (e.g., dots). The number of filler characters
 * is based on the width of the container for each item and changes as the window is resized using
 * the `ResizeObserver` API.
 *
 * @component
 * @param {Object} props - Props for the component.
 * @param {string[]} props.highlights - An array of string highlights representing the items to display.
 * @param {string} [props.filler='.'] - An optional string used as a filler character (e.g., dots). Defaults to a period ('.').
 * @param {number} [props.pixelsPerFiller=8] - An optional number representing the number of pixels per one filler. Defaults to a eight pixels (8px).
 *
 * @example
 * ```tsx
 * const highlights = ["In-depth research", "Business goals", "Project roadmap"];
 * <div>
 *  ...
 *  <Stdout highlights={highlights} filler="-" pixelsPerFiller={4} />
 *  ...
 * </div>
 *```
 *
 * @remarks
 * - The number of filler characters adjusts dynamically to the width of each container, making the design responsive.
 * - The `filler` prop allows customization of the character used to fill the space (e.g., dots, dashes).
 * - This component is ideal for displaying important information in a visually dynamic way, with customizable decorative elements.
 *
 * @param {string[]} highlights - An array of strings representing the items or values to be displayed in the component.
 * @param {string} [filler='.'] - An optional string for the filler character, with a default value of '.' (period).
 * @param {number} [pixelsPerFiller=8] - An optional number representing the number of pixels per one filler. Defaults to a eight pixels (8px).
 * @returns {JSX.Element} Returns JSX markup for displaying the items with dynamically adjusted filler characters.
 */
const Stdout: FC<IStdoutProps> = props => {
  /**
   * Calculate the number of fillers based on the container's width.
   * @param {number} elementWidth - The width of the container in pixels.
   * @returns Number of fillers that fit in the container based on its width.
   * @function
   */
  const calculateFillerCount = (elementWidth: number) => {
    // Estimated width of one filler in pixels (adjust based on your design)
    const fillerWidth = pixelsPerFiller
    // Returns how many fillers fit the current width
    return Math.floor(elementWidth / fillerWidth)
  }

  /**
   * Handles the resizing of the containers and recalculates the number of fillers
   * whenever a container's size changes.
   */
  const handleResize = () => {
    if (containerRefs.current) {
      const newFillerCounts = containerRefs.current.map(container => {
        if (container) {
          const width = container.offsetWidth // Get the width of the container
          // Calculate the number of fillers based on the width
          return calculateFillerCount(width)
        }
        return 0 // Return 0 if the container is null (just a fallback)
      })
      // Update state with the new number of fillers
      setFillerCounts(newFillerCounts)
    }
  }

  // Props de-structurization
  const { highlights, filler = ".", pixelsPerFiller = 8 } = props

  /** @references */
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]) // Refs to hold references to each container where the fillers will be rendered

  /** @states */
  const [fillerCounts, setFillerCounts] = useState<number[]>([]) // Track the number of fillers for each valuable item

  useEffect(() => {
    // Create a ResizeObserver to observe changes in container sizes
    const resizeObserver = new ResizeObserver(handleResize)
    containerRefs.current.forEach(container => {
      if (container) {
        resizeObserver.observe(container) // Start observing each container
      }
    })

    // Initial calculation of dot counts when the component mounts
    handleResize()

    // Stop observing containers when the component is unmounted
    return () => {
      resizeObserver.disconnect() // Disconnect the observer to prevent memory leaks
    }
  }, [highlights])

  useEffect(() => {
    // Re-calculate fillers whenever the highlights prop changes
    const newFillerCounts = highlights.map(() => 0) // Initialize to 0
    // Update state with the new filler counts
    setFillerCounts(newFillerCounts)
  }, [highlights])

  return (
    <div className='steps__decorative-stdout-wrapper'>
      {/* Map through the 'highlights' array and render each item */}
      {highlights.map((highlight, index) => (
        <div key={highlight} className='steps__decorative-stdout'>
          <p>{highlight}</p>
          {/* Container to hold the dynamic fillers */}
          <div className='steps__decorative-stdout-filler-wrapper' ref={elt => (containerRefs.current[index] = elt)}>
            <p className='steps__decorative-stdout-filler'>
              {/* Render the filler based on calculated count */}
              {`${filler}`.repeat(fillerCounts[index] || 0)}
            </p>
          </div>
          {/* prettier-ignore */}
          <p>{"["}{" "}<span className='steps__decorative-stdout--success'>{"ok"}</span>{" "}{"]"}</p>
        </div>
      ))}
    </div>
  )
}

interface IStepsContents {
  id: number
  title: string
  description: string
  highlights: string[]
}

const stepsContents: IStepsContents[] = [
  {
    id: 1,
    title: "Analysis",
    description: `
      We dive deep into your business, identifying key goals and challenges. Through in-depth
      research and collaborative discussions, we craft a tailored project plan, ensuring every
      detail aligns with your vision and sets the stage for a successful development journey
    `,
    highlights: ["In-depth research", "Business goals", "Project roadmap", "Strategic project foundation"],
  },
  {
    id: 2,
    title: "Development",
    description: `
      We bring your vision to life with precision and innovation, building a robust backend that
      grows with your business. Every solution is tailored for scalability, security, and
      performance, ensuring that your system not only works today but evolves with future demands
    `,
    highlights: ["Custom backend solutions", "Scalable and secure", "High-performance", "Future-proof development"],
  },
  {
    id: 3,
    title: "Testing",
    description: `
      We ensure your backend performs as expected through focused testing. Our team reviews key
      functionalities, addressing potential issues early to guarantee stability, security, and seamless
      integration with other systems, all while minimizing delays in the development process
    `,
    highlights: ["Focused backend testing", "Stability assurance", "Early issue resolution", "Seamless integration"],
  },
  {
    id: 4,
    title: "Staging",
    description: `
      Before launch, we recreate real-world scenarios in a staging environment, ensuring every feature,
      function, and integration works perfectly. This step gives us and you the confidence that the
      final product will excel when it goes live
    `,
    highlights: ["Scenario simulation", "Pre-launch validation", "Staging environment", "Production-ready checks"],
  },
  {
    id: 5,
    title: "Release",
    description: `
      We handle the final step with care and precision, ensuring a seamless, trouble-free launch.
      Post-launch, we're with you, providing ongoing support and optimizations to ensure your system
      runs smoothly and continues to meet evolving needs
    `,
    highlights: ["Seamless deployment", "Post-launch support", "Ongoing optimization", "Smooth production release"],
  },
] as const

const charsSequence = "*<>_{}" as string
const randomCharsNumber = (1 << 3) as number

const scrambleDecorativeText = randomChars(charsSequence, randomCharsNumber)
const scrambleDecorativeTextParams = {
  speed: 0.55,
  tick: 3,
  step: 1,
  scramble: 10,
  overflow: true,
  overdrive: false,
} as const

const scrambleDescriptionParams = {
  speed: 0.85,
  scramble: 3,
  step: 5,
  seed: 3,
  overflow: true,
  overdrive: false,
  playOnMount: false,
} as const

const initialActiveNavigateItem = 1 as number

const Steps: FC = () => {
  /** @references */
  const scrambleTimeoutRef = useRef<number | null>(null) // Ref to animation timeout for decoration text
  const squareTimeoutRef = useRef<number | null>(null) // Ref to animation timeout for square

  /** @states */
  const [activeNavigateItem, setActiveNavigateItem] = useState<number>(initialActiveNavigateItem) // Stores the active state of the `Step`

  // Memoize the active `Step` for search optimization
  const activeStep = useMemo(() => stepsContents.find(sp => sp.id === activeNavigateItem), [activeNavigateItem])

  const { ref: scrambleDecorativeTextRef, replay: scrambleReplay } = useScramble({
    text: scrambleDecorativeText,
    range: [33, 43],
    onAnimationEnd: () => {
      const timeout = randomBetween(10_500, 14_000)
      runWithTimeout(scrambleTimeoutRef, scrambleReplay, timeout)
    },
    ...scrambleDecorativeTextParams,
  })

  const { ref: descriptionRef } = useScramble({
    text: activeStep?.description || "",
    ...scrambleDescriptionParams,
  })

  const { ref: decorativeSquareRef, replay: squareReplay } = useRotator({
    angle: 270,
    direction: "right",
    duration: 600,
    onAnimationEnd: () => {
      const timeout = randomBetween(4_000, 8_250)
      runWithTimeout(squareTimeoutRef, squareReplay, timeout)
    },
  })

  return (
    <div className='steps'>
      <h2 className='steps__title'>
        <Typed strings={["Steps"]} typeSpeed={50} cursorChar='_' showCursor={true} startWhenVisible />
      </h2>
      <p className='steps__decorative-text--static'>{"&//="}</p>
      <div className='steps__navigate'>
        {stepsContents.map((stepContent, _) => (
          <div
            key={stepContent.id}
            className={`steps__navigate-btn ${activeNavigateItem === stepContent.id ? "active" : ""}`}
            onClick={() => setActiveNavigateItem(stepContent.id)}
          >
            {`0${stepContent.id}`}
          </div>
        ))}
      </div>
      <div className='steps__decorative-square' ref={decorativeSquareRef}></div>
      <div className='steps__step-title-wrapper'>
        <p className='steps__step-title-navigate-item'>{`/0${activeStep?.id}`}</p>
        <h3 className='steps__step-title'>{activeStep?.title}</h3>
      </div>
      <div className='steps__step-description-wrapper'>
        <p className='steps__step-description' ref={descriptionRef}>
          {activeStep?.description}
        </p>
        <div className='steps__decorative-stdout-wrapper'>
          <Stdout highlights={activeStep?.highlights || []} />
        </div>
      </div>
      <p className='steps__decorative-text--scramble' ref={scrambleDecorativeTextRef}></p>
      <p className='steps__decorative-abstract-phrase'>These sessions give you direct</p>
    </div>
  )
}

export default Steps
