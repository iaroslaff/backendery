import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import AnimateRadixGrid from "../../../components/AnimateRadixGrid/AnimateRadixGrid"
import AnimateSignalStrip from "../../../components/AnimateSignalStrip/AnimateSignalStrip"

import "./WeDo.scss"

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
 * const highlights = ["Continuous learning", "Best practices", "Reliability", "Mentorships"];
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
const Stdout: FC<IStdoutProps> = React.memo(props => {
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

  // Memoizing the dot counts so they are only recalculated when 'ourValuables' changes
  const memoizedFillerCounts = useMemo(() => fillerCounts, [fillerCounts]);

  return (
    <div className='wedo__decorative-stdout-wrapper'>
      {/* Map through the 'highlights' array and render each item */}
      {highlights.map((highlight, index) => (
        <div key={highlight} className='wedo__decorative-stdout'>
          <p>{highlight}</p>
          {/* Container to hold the dynamic fillers */}
          <div className='wedo__decorative-stdout-filler-wrapper' ref={elt => (containerRefs.current[index] = elt)}>
            <p className='wedo__decorative-stdout-filler'>
              {/* Render the filler based on calculated count */}
              {filler.repeat(memoizedFillerCounts[index] || 0)}
            </p>
          </div>
          {/* prettier-ignore */}
          <p>{"["}{" "}<span className='wedo__decorative-stdout--success'>{"ok"}</span>{" "}{"]"}</p>
        </div>
      ))}
    </div>
  )
});

interface IWeDoContents {
  id: number
  symbols: string
  service: string
  description: string
  highlights: string[]
}

const wedoContents: IWeDoContents[] = [
  {
    id: 1,
    symbols: "=>",
    service: "Server Apps & API",
    description: `
      We develop high-performance server applications and APIs that ensure reliable
      interaction between systems. Our solutions are tailored to meet specific business
      needs, enhancing operational efficiency and scalability
  `,
    highlights: ["High-performance server apps", "Reliable system interaction", "Scalability and operational"]
  },
  {
    id: 2,
    symbols: "@;",
    service: "Services Integration",
    description: `
      We integrate diverse services to create seamless and effective workflows. By ensuring
      compatibility and efficiency, we help businesses streamline their processes and improve
      overall productivity
    `,
    highlights: ["Seamless integration", "Compatibility and efficiency", "Streamlined processes"]
  },
  {
    id: 3,
    symbols: "&*",
    service: "CLI & Automation Tools",
    description: `
      We create command-line tools and automation solutions to simplify routine tasks and boost
      productivity. Our tools are designed to enhance user experience, allowing teams to focus
      on more strategic initiatives
    `,
    highlights: ["Command-line tools", "Routine task automation", "Enhanced productivity"]
  },
  {
    id: 4,
    symbols: "==",
    service: "Bots",
    description: `
      We develop bots for various platforms, including chatbots and user interaction automation.
      These solutions enhance customer experience and engagement, providing quick responses and
      improving service quality
    `,
    highlights: ["Multibots", "Customer enhancement", "Improved engagement"]
  },
] as const

const scrambleDescriptionParams = {
  speed: 0.85,
  scramble: 3,
  step: 5,
  seed: 3,
  overflow: true,
  overdrive: false,
  playOnMount: false,
} as const

const initialActiveMenuItem = 1 as number

const WeDo: FC = () => {
  /** @states */
  const [activeMenuItem, setActiveMenuItem] = useState<number>(initialActiveMenuItem) // Stores the active state of the `WeDo`

  // Memoize the active `WeDo` for search optimization
  const activeWeDo = useMemo(() => wedoContents.find(wd => wd.id === activeMenuItem), [activeMenuItem])

  const { ref: descriptionRef } = useScramble({
    text: activeWeDo?.description || "",
    ...scrambleDescriptionParams,
  })

  return (
    <div className='wedo'>
      <h2 className='wedo__title'>
        <Typed strings={["We Do"]} typeSpeed={50} cursorChar='_' showCursor={true} startWhenVisible />
      </h2>
      <div className='wedo__decorative-corner'></div>
      <div className='wedo__menu'>
        {wedoContents.map((wedoContent, _) => (
          <div key={wedoContent.id} className={`wedo__menu-item ${activeMenuItem === wedoContent.id ? "active" : ""}`}>
            <p className={`wedo__menu-item-symbols ${activeMenuItem === wedoContent.id ? "active" : ""}`}>
              {wedoContent.symbols}
            </p>
            <p
              className={`wedo__menu-item-service ${activeMenuItem === wedoContent.id ? "active" : ""}`}
              onClick={() => setActiveMenuItem(wedoContent.id)}
            >
              {wedoContent.service}
            </p>
          </div>
        ))}
      </div>
      <div className='wedo__description-wrapper'>
        <div className='wedo__decorative-animate-signal-strip-wrapper'>
          <AnimateSignalStrip
            symbol='.'
            maxNumberOfSymbols={7}
            minInterval={1250}
            maxInterval={2500}
            initialSymbols='.....'
            style={{ color: "#67df8f" }}
          />
          <AnimateSignalStrip
            symbol='.'
            maxNumberOfSymbols={4}
            minInterval={1000}
            maxInterval={2500}
            initialSymbols='..'
            style={{ color: "#ffffff" }}
          />
        </div>
        <div className='wedo__description'>
          <span className='wedo__description-highlight'>{"/** description"}</span>
          <p ref={descriptionRef}>{activeWeDo && activeWeDo.description}</p>
          <span className='wedo__description-highlight'>{"*/"}</span>
        </div>
        <Stdout highlights={activeWeDo?.highlights || []} />
      </div>
      <div className='wedo__decorative-text'>~/../..</div>
      <div className='wedo__decorative-animate-radix-grid-wrapper'>
        <AnimateRadixGrid
          symbols={["0", "1"]}
          rows={7}
          cols={2}
          minInterval={300}
          maxInterval={750}
          unreachableCells={[
            [3, 0],
            [4, 0],
            [5, 0],
            [6, 0],
          ]}
        />
      </div>
    </div>
  )
}

export default WeDo
