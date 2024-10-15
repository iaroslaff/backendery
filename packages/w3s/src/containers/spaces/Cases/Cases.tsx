import { FC, useMemo, useState } from "react"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import Marquee from "../../../components/Marquee/Marquee"
import { randomChars } from "../../../utils/fn"

import "./Cases.scss"

interface ICasesContents {
  id: number
  category: string
  title: string
  description: string
  technologies: string
}

interface ICaseDetailsProps {
  caseContent: ICasesContents
  descriptionRef?: React.RefObject<HTMLParagraphElement>
}

const CASES_CONTENTS: ICasesContents[] = [
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

const CHARS_SEQUENCE = "1234567890ABCDEF" as string
const RANDOM_CHARS_NUMBER = (1 << 3) as number

const SCRAMBLE_DESCRIPTION_PARAMS = {
  speed: 0.85,
  scramble: 3,
  step: 5,
  seed: 3,
  overflow: true,
  overdrive: false,
  playOnMount: false,
} as const

const INITIAL_ACTIVE_NAVIGATE_ITEM = 1 as number

const DECORATIVE_INDICATORS_NUMBER = 7 as number

/**
 * CaseDetails Component
 *
 * The `CaseDetails` component is responsible for displaying detailed information about a specific company case.
 * It accepts case data through props and presents it on the screen.
 * Additionally, an optional reference to the description element can be passed for manipulation (e.g., for animations).
 *
 * @component
 * @param {ICasesContents} caseContent - An object containing the details of the case, including its category, title, description, and technologies used.
 * @param {React.RefObject<HTMLParagraphElement>} [descriptionRef] - An optional reference to the paragraph element for the description to interact with it (e.g., for text animation).
 *
 * @example
 * ```tsx
 * const caseContent = {
 *   id: 1,
 *   category: "../My category",
 *   title: "Title",
 *   description: "Here's a description",
 *   technologies: "And here are the technologies used",
 * };
 *
 * <div>
 *   ...
 *   <CaseDetails caseContent={caseContent} descriptionRef={myRef} />
 *   ...
 * </div>
 *```
 *
 * @remarks
 * - The component can be reused for various cases by passing different `caseContent` objects.
 * - The `descriptionRef` is useful for animations or other interactions with the description element.
 *
 * @param {Object} props - Props for the component.
 * @param {ICasesContents} props.caseContent - The object containing the details of the specific case.
 * @param {React.RefObject<HTMLParagraphElement>} [props.descriptionRef] - An optional reference to the paragraph element for the description.
 *
 * @returns {JSX.Element} Returns JSX markup for displaying case details.
 */
const CaseDetails: FC<ICaseDetailsProps> = props => {
  // Props de-structurization
  const { caseContent, descriptionRef = null } = props

  return (
    <div className='cases__case'>
      <p className='cases__case-category'>{caseContent.category}</p>
      <h3 className='cases__case-title'>{caseContent.title}</h3>
      <p className='cases__case-description' ref={descriptionRef}>
        {caseContent.description}
      </p>
      <p className='cases__case-technologies-title'>Used technologies</p>
      <p>{caseContent.technologies}</p>
    </div>
  )
}

const Cases: FC = () => {
  /** @states */
  const [activeNavigateItem, setActiveNavigateItem] = useState<number>(INITIAL_ACTIVE_NAVIGATE_ITEM) // Stores the active state of the `Case`

  // Memoize the active `Case` for search optimization
  const activeCase = useMemo(() => CASES_CONTENTS.find(cs => cs.id === activeNavigateItem), [activeNavigateItem])

  const { ref: descriptionRef } = useScramble({
    text: activeCase?.description || "",
    ...SCRAMBLE_DESCRIPTION_PARAMS,
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
      {/* Normal view of the display case */}
      <div className='cases__case-wrapper'>
        {CASES_CONTENTS.map(caseContent => (
          <CaseDetails key={caseContent.id} caseContent={caseContent} />
        ))}
      </div>
      {/* Shrinked view of the case display */}
      <div className='cases__shrinked-case-wrapper'>
        {activeCase && <CaseDetails caseContent={activeCase} descriptionRef={descriptionRef} />}
      </div>
      {/* Navigating through the cases */}
      <div className='cases__multi-wrapper'>
        <div className='cases__decorative-indicators'>
          {Array.from({ length: DECORATIVE_INDICATORS_NUMBER }).map((_, index) => (
            <div key={index} className='cases__decorative-indicator'>{`[0${CASES_CONTENTS.length}]`}</div>
          ))}
        </div>
        <p>Our last cases</p>
        <div className='cases__navigate'>
          {CASES_CONTENTS.map((caseContent, _) => (
            <div
              key={caseContent.id}
              className={`cases__navigate-btn ${activeNavigateItem === caseContent.id ? "active" : ""}`}
              onClick={() => setActiveNavigateItem(caseContent.id)}
            >
              {`0${caseContent.id}`}
            </div>
          ))}
        </div>
      </div>
      <div className='cases__decorative-symbols'>
        {"0x"}
        {randomChars(CHARS_SEQUENCE, RANDOM_CHARS_NUMBER)}
      </div>
    </div>
  )
}

export default Cases
