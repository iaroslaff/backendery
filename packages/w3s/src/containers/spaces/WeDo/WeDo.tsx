import { FC, useMemo, useState } from "react"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import AnimateRadixGrid from "../../../components/AnimateRadixGrid/AnimateRadixGrid"
import AnimateSignalStrip from "../../../components/AnimateSignalStrip/AnimateSignalStrip"

import "./WeDo.scss"

interface IWeDoContents {
  id: number
  symbols: string
  name: string
  description: string
}

const WE_DO_CONTENTS: IWeDoContents[] = [
  {
    id: 0,
    symbols: "=>",
    name: "Server Apps & API",
    description:
      "We develop high-performance server applications and APIs that ensure reliable interaction between systems. Our solutions are tailored to meet specific business needs, enhancing operational efficiency and scalability.",
  },
  {
    id: 1,
    symbols: "@;",
    name: "Services Integration",
    description:
      "We integrate diverse services to create seamless and effective workflows. By ensuring compatibility and efficiency, we help businesses streamline their processes and improve overall productivity.",
  },
  {
    id: 2,
    symbols: "&*",
    name: "CLI & Automation Tools",
    description:
      "We create command-line tools and automation solutions to simplify routine tasks and boost productivity. Our tools are designed to enhance user experience, allowing teams to focus on more strategic initiatives.",
  },
  {
    id: 3,
    symbols: "==",
    name: "Bots",
    description:
      "We develop bots for various platforms, including chatbots and user interaction automation. These solutions enhance customer experience and engagement, providing quick responses and improving service quality.",
  },
] as const

const INITIAL_ACTIVE_MENU_ITEM = 0 as number

const SCRAMBLE_PARAMS = {
  speed: 0.85,
  scramble: 3,
  step: 5,
  seed: 3,
  overflow: true,
  overdrive: false,
  playOnMount: false,
}

const WeDo: FC = () => {
  /** @states */
  const [activeMenuItem, setActiveMenuItem] = useState<number>(INITIAL_ACTIVE_MENU_ITEM) // Stores the active state of the We Do

  // Memoize the active `We Do` for search optimization
  const activeWeDo = useMemo(() => WE_DO_CONTENTS.find(wd => wd.id === activeMenuItem), [activeMenuItem])

  const { ref: descriptionRef } = useScramble({
    text: activeWeDo?.description || "",
    ...SCRAMBLE_PARAMS,
  })

  return (
    <div className='wedo'>
      <h2 className='wedo__title'>
        <Typed strings={["We Do"]} typeSpeed={50} cursorChar='_' showCursor={true} startWhenVisible />
      </h2>
      <div className='wedo__decorative-corner'></div>
      <div className='wedo__menu'>
        {WE_DO_CONTENTS.map((wedoContent, _) => (
          <div key={wedoContent.id} className={`wedo__menu-item ${activeMenuItem === wedoContent.id ? "active" : ""}`}>
            <p className={`wedo__menu-item-symbols ${activeMenuItem === wedoContent.id ? "active" : ""}`}>
              {wedoContent.symbols}
            </p>
            <p
              className={`wedo__menu-item-name ${activeMenuItem === wedoContent.id ? "active" : ""}`}
              onClick={() => setActiveMenuItem(wedoContent.id)}
            >
              {wedoContent.name}
            </p>
          </div>
        ))}
      </div>
      <div className='wedo__description-wrapper'>
        <div className='wedo__decorative-dots'>
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
          <span className='wedo__description-highlight'>{"/** "}</span>
          <p ref={descriptionRef}>{activeWeDo && activeWeDo.description}</p>
          <span className='wedo__description-highlight'>{" */"}</span>
        </div>
        <div className='wedo__decorative-stdout'>

          <div className="wedo__decorative-stdout-wrapper">
            <p className="wedo__decorative-stdout-name">Continuous learning</p>
            <div className="wedo__decorative-stdout-dots-container">
              <p className="wedo__decorative-stdout-dots">.......................................</p>
            </div>
            <p> {"["} <span className='wedo__decorative-stdout-wrapper--item'>{"ok"} </span>{"]"}
            </p>
          </div>

          <div className="wedo__decorative-stdout-wrapper">
            <p className="wedo__decorative-stdout-name">Best practices</p>
            <div className="wedo__decorative-stdout-dots-container">
              <p className="wedo__decorative-stdout-dots">.......................................</p>
            </div>
            <p> {"["} <span className='wedo__decorative-stdout-wrapper--item'>{"ok"} </span>{"]"}
            </p>
          </div>

          <div className="wedo__decorative-stdout-wrapper">
            <p className="wedo__decorative-stdout-name">Mentorships</p>
            <div className="wedo__decorative-stdout-dots-container">
              <p className="wedo__decorative-stdout-dots">.......................................</p>
            </div>
            <p> {"["} <span className='wedo__decorative-stdout-wrapper--item'>{"ok"} </span>{"]"}
            </p>
          </div>

        </div>
      </div>
      <div className='wedo__decorative-symbols'>../../</div>
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
