import { FC, useMemo, useRef, useState } from "react"
import Marquee from "react-fast-marquee"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import { randomBetween, randomChars, runWithTimeout } from "../../../utils/fn"

import "./Cases.scss"

interface ICasesContent {
  id: number
  category: string
  title: string
  description: string
  technologies: string[]
}

interface ICaseDetailsProps {
  content: ICasesContent
  descriptionRef?: React.RefObject<HTMLParagraphElement>
}

/* prettier-ignore */
const casesContents: ICasesContent[] = [
  {
    id: 1,
    category: "../Sport && Odds",
    title: "Trading system",
    description: `
      We developed a fully automated trading system for the Betfair exchange, featuring event
      search and analysis with predefined algorithms, probability distribution, risk assessment,
      and automatic bet placement. The system also delivers real-time notifications via messaging
      apps, optimizing trading operations with advanced features
    `,
    technologies: [
      "Python",
      "FastAPI",
      "SciPy",
      "SQLAlchemy",
      "APScheduler",
      "Rust",
      "Axum",
      "SerDe",
      "Diesel",
      "PostgreSQL"
    ],
  },
  {
    id: 2,
    category: "../Sport Betting",
    title: "Services Integration",
    description: `
      We develop bots for various platforms, including chatbots and user interaction automation.
      These solutions enhance customer experience and engagement, providing quick responses and improving
      service quality
    `,
    technologies: [""],
  },
  {
    id: 3,
    category: "../e-Commerce",
    title: "Online Store",
    description: `
      We developed the backend for a custom online store selling metal and steel products with a product
      configurator. Customers could design cabinets, shelves, or bar station, adjusting dimensions and
      materials with real-time price updates. This streamlined both individual and bulk orders, improving
      engagement and management
    `,
    technologies: [
      "Python",
      "FastAPI",
      "Ariadne",
      "SQLAlchemy",
      "Pydantic",
      "PostgreSQL",
      "Redis",
      "Alembic",
      "Datadog"
    ],
  },
] as const

const charsSequence = "1234567890ABCDEF" as string
const randomCharsNumber = (1 << 3) as number

const scrambleDecorativeTextParams = {
  speed: 0.45,
  tick: 1,
  step: 1,
  scramble: 12,
  seed: 0,
  overflow: true,
  overdrive: 45,
}

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

const decorativeIndicatorsNumber = 7 as number

/**
 * The `CaseDetails` component is responsible for displaying detailed information about a specific company case. It
 * accepts case data through props and presents it on the screen. Additionally, an optional reference to the description
 * element can be passed for manipulation (e.g., for animations).
 *
 * @component
 * @param {ICasesContent} content - An object containing the details of the case, including its category, title,
 * description, and technologies used.
 * @param {React.RefObject<HTMLParagraphElement>} [descriptionRef] - An optional reference to the paragraph element for
 * the description to interact with it (e.g., for text animation).
 *
 * @example
 * ```tsx
 * const content = {
 *   id: 1,
 *   category: "../My category",
 *   title: "Title",
 *   description: "Here's a description",
 *   technologies: "And here are the technologies used",
 * };
 *
 * <div>
 *   ...
 *   <CaseDetails content={content} descriptionRef={descriptionRef} />
 *   ...
 * </div>
 *```
 *
 * @remarks
 * - The component can be reused for various cases by passing different `content` objects.
 * - The `descriptionRef` is useful for animations or other interactions with the description element.
 *
 * @param {ICasesContent} content - The object containing the details of the specific case.
 * @param {React.RefObject<HTMLParagraphElement>} [descriptionRef] - An optional reference to the paragraph element for
 * the description.
 *
 * @returns {JSX.Element} Returns JSX markup for displaying `Case` details.
 */
const CaseDetails: FC<ICaseDetailsProps> = ({ content, descriptionRef = null }) => {
  return (
    <div className='cases__case'>
      <p className='cases__case-category'>{content.category}</p>
      <h3 className='cases__case-title'>{content.title}</h3>
      <p className='cases__case-description' ref={descriptionRef}>
        {content.description}
      </p>
      <p className='cases__case-technologies-title'>Used technologies</p>
      <p>{content.technologies.join(' • ')}</p>
    </div>
  )
}

const Cases: FC = () => {
  /** @states */
  const [activeNavigateItem, setActiveNavigateItem] = useState<number>(initialActiveNavigateItem)

  /** @references */
  // Ref to animation timeout for text
  const scrambleTimeoutRef = useRef<number | null>(null)

  /** @memos */
  // Memoize the active `Case` content for search optimization
  const activeContent = useMemo(() => casesContents.find(item => item.id === activeNavigateItem), [activeNavigateItem])

  const { ref: descriptionRef } = useScramble({
    text: activeContent?.description || "",
    ...scrambleDescriptionParams,
  })

  const { ref: decorativeTextRef, replay: scrambleReplay } = useScramble({
    text: `0x${randomChars(charsSequence, randomCharsNumber)}`,
    ignore: ["0", "x"],
    range: [48, 57, 65, 70],
    onAnimationEnd: () => {
      const timeout = randomBetween(4_100, 7_550)
      runWithTimeout(scrambleTimeoutRef, scrambleReplay, timeout)
    },
    ...scrambleDecorativeTextParams,
  })

  return (
    <div className='cases'>
      <h2 className='cases__title'>
        <Typed strings={["Cases"]} typeSpeed={50} cursorChar='_' showCursor={true} startWhenVisible />
      </h2>
      <div className='cases__decorative-corner'></div>
      <div className='cases__decorative-marquee-str-wrapper'>
        <span className='cases__decorative-marquee-str-wrapper--brace'>{"["}</span>
        <div className='cases__decorative-marquee-str'>
          <Marquee
            autoFill={true}
            pauseOnHover={true}
            speed={15}
          >
            {"|scale your code|maximize performance|optimize your workflow"}
          </Marquee>
        </div>
        <span className='cases__decorative-marquee-str-wrapper--brace'>{"]"}</span>
      </div>
      {/* Normal view of the display `Case` */}
      <div className='cases__case-wrapper'>
        {casesContents.map(content => (
          <CaseDetails key={content.id} content={content} />
        ))}
      </div>
      {/* Shrinked view of the display `Case` */}
      <div className='cases__shrinked-case-wrapper'>
        {activeContent && (
          <CaseDetails key={activeContent.id} content={activeContent} descriptionRef={descriptionRef} />
        )}
      </div>
      {/* Navigating through the `Cases` */}
      <div className='cases__multi-wrapper'>
        <div className='cases__decorative-indicators'>
          {Array.from({ length: decorativeIndicatorsNumber }).map((_, index) => (
            <div key={index} className='cases__decorative-indicator'>{`[0${casesContents.length}]`}</div>
          ))}
        </div>
        <p>Our last cases</p>
        <div className='cases__navigate'>
          {casesContents.map((content, _) => (
            <div
              key={content.id}
              className={`cases__navigate-btn ${activeNavigateItem === content.id ? "active" : ""}`}
              onClick={() => setActiveNavigateItem(content.id)}
            >
              {`0${content.id}`}
            </div>
          ))}
        </div>
      </div>
      <div className='cases__decorative-text' ref={decorativeTextRef}></div>
    </div>
  )
}

export default Cases
