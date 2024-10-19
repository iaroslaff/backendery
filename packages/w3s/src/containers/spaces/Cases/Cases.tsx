import { FC, useMemo, useRef, useState } from "react"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import Marquee from "../../../components/Marquee/Marquee"
import { randomBetween, randomChars, runWithTimeout } from "../../../utils/fn"

import "./Cases.scss"

interface ICasesContent {
  id: number
  category: string
  title: string
  description: string
  technologies: string
}

interface ICaseDetailsProps {
  content: ICasesContent
  descriptionRef?: React.RefObject<HTMLParagraphElement>
}

const casesContents: ICasesContent[] = [
  {
    id: 1,
    category: "../Sport Betting",
    title: "Server Apps & API",
    description: `
      We develop high-performance server applications and APIs that ensure reliable interaction
      between systems. Our solutions are tailored to meet specific business needs, enhancing operational
      efficiency and scalability.
    `,
    technologies: "Python, GitLab, NGINX, Docker, Stack, Bitbucket...",
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
    technologies: "Python, GitLab, NGINX, Docker, Stack, Bitbucket...",
  },
  {
    id: 3,
    category: "../Sport Betting",
    title: "CLI & Automation Tools",
    description: `
      We create command-line tools and automation solutions to simplify routine tasks and boost productivity.
      Our tools are designed to enhance user experience, allowing teams to focus on more strategic initiatives.
    `,
    technologies: "Python, GitLab, NGINX, Docker, Stack, Bitbucket...",
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
      <p>{content.technologies}</p>
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
          <Marquee text='scale your code width scale your code width scale your code width' speed={10} />
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
        {activeContent && <CaseDetails key={activeContent.id} content={activeContent} descriptionRef={descriptionRef} />}
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
