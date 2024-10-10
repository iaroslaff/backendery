import { FC, useEffect, useState } from "react"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import AnimateRadixGrid from "../../../components/AnimateRadixGrid/AnimateRadixGrid"
import AnimateSignalStrip from "../../../components/AnimateSignalStrip/AnimateSignalStrip"

import "./WeDo.scss"

/**
 * An array of content objects representing the services offered by the company.
 * Each object contains details about a specific service, including its identifier,
 * visual symbol, name, and a description that outlines the service's features and benefits.
 *
 * @type {Array<WeDoContent>}
 * @constant
 *
 * Each service object includes:
 * - id: A unique identifier for the service.
 * - symbol: A visual symbol representing the service.
 * - name: The name of the service.
 * - description: A detailed description of the service's purpose and benefits.
 */
const __weDoContent: Record<string, string>[] = [
  {
    id: "server-apps-and-api",
    symbol: "=>",
    name: "Server Apps & API",
    description:
      "We develop high-performance server applications and APIs that ensure reliable interaction between systems. Our solutions are tailored to meet specific business needs, enhancing operational efficiency and scalability",
  },
  {
    id: "services-integration",
    symbol: "@;",
    name: "Services Integration",
    description:
      "We integrate diverse services to create seamless and effective workflows. By ensuring compatibility and efficiency, we help businesses streamline their processes and improve overall productivity",
  },
  {
    id: "cli-and-automation-tools",
    symbol: "&*",
    name: "CLI & Automation Tools",
    description:
      "We create command-line tools and automation solutions to simplify routine tasks and boost productivity. Our tools are designed to enhance user experience, allowing teams to focus on more strategic initiatives",
  },
  {
    id: "bots",
    symbol: "==",
    name: "Bots",
    description:
      "We develop bots for various platforms, including chatbots and user interaction automation. These solutions enhance customer experience and engagement, providing quick responses and improving service quality",
  },
] as const

const INITIAL_ACTIVE_TAB = 0 as number

const WeDo: FC = () => {
  /** states */
  const [activeTab, setActiveTab] = useState<string>(__weDoContent[INITIAL_ACTIVE_TAB].id)
  const [description, setDescription] = useState<string>(__weDoContent[INITIAL_ACTIVE_TAB].description)

  const { ref: descriptionRef, replay: scrambleReplay } = useScramble({
    text: description,
    speed: 0.85,
    scramble: 3,
    step: 5,
    seed: 3,
    overflow: true,
    overdrive: false,
    playOnMount: false,
  })

  useEffect(() => {
    const currentContent = __weDoContent.find(wd => wd.id === activeTab)
    if (currentContent) {
      setDescription(currentContent.description)
    }
  }, [activeTab])

  return (
    <div className='wedo'>
      <h2 className='wedo__title'>
        <Typed strings={["We Do"]} typeSpeed={50} cursorChar='_' showCursor={true} startWhenVisible />
      </h2>
      <div className='wedo__decorative-corner'></div>
      <div className='wedo__tabs-wrapper'>
        {__weDoContent.map(wd => (
          <div
            key={wd.id}
            className='wedo__tab'
            onClick={() => {
              if (activeTab !== wd.id) {
                /** activate the selected tab */
                setActiveTab(wd.id)
                /** change the description */
                setDescription(wd.description)
                /** run animation `scramble` for the description */
                scrambleReplay()
              }
            }}
          >
            <p className='wedo__tab-symbol'>{wd.symbol}</p>
            <p className={`wedo__tab-name ${activeTab === wd.id ? "active" : ""}`}>{wd.name}</p>
          </div>
        ))}
      </div>
      <div className='wedo__description-wrapper'>
        <div className='wedo__dots'>
          <AnimateSignalStrip
            symbol='.'
            maxNumberOfSymbols={7}
            minInterval={1_250}
            maxInterval={2_500}
            initialSymbols='.....'
            style={{ color: "#67df8f" }}
          />
          <AnimateSignalStrip
            symbol='.'
            maxNumberOfSymbols={4}
            minInterval={1_000}
            maxInterval={2_500}
            initialSymbols='..'
            style={{ color: "#ffffff" }}
          />
        </div>
        <p className='wedo__description' ref={descriptionRef}>
          <span className='wedo__description-highlight'>/* </span>
          {description}
          <span className='wedo__description-highlight'> */</span>
        </p>
        <div className='wedo__decorative-stdout'>
          <p className='wedo__decorative-stdout--item'>{"Continuous learning..........[ OK ]"}</p>
          <p className='wedo__decorative-stdout--item'>{"Best practices...............[ OK ]"}</p>
          <p className='wedo__decorative-stdout--item'>{"Mentorships..................[ OK ]"}</p>
        </div>
      </div>
      <div className='wedo__decorative-symbols'>../../</div>
      <div className='wedo__animate-radix-grid-wrapper'>
        <AnimateRadixGrid
          symbols={["0", "1"]}
          rows={7}
          cols={2}
          minInterval={700}
          maxInterval={1_150}
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
