import { FC, useMemo, useRef, useState } from "react"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import { useRotator } from "../../../hooks/useRotator"
import { randomBetween, randomChars, runWithTimeout } from "../../../utils/fn"

import "./Steps.scss"

interface IStepsContents {
  id: number
  title: string
  description: string
}

const STEPS_CONTENTS: IStepsContents[] = [
  {
    id: 1,
    title: "Analysis",
    description:
      "At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the project",
  },
  {
    id: 2,
    title: "Development",
    description:
      "At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the project",
  },
  {
    id: 3,
    title: "Testing",
    description:
      "At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the project",
  },
  {
    id: 4,
    title: "Staging",
    description:
      "At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the project",
  },
  {
    id: 5,
    title: "Release",
    description:
      "At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the project",
  },
] as const

const CHARS_SEQUENCE = "*<>_{}" as string
const RANDOM_CHARS_NUMBER = (1 << 3) as number

const SCRAMBLE_DECORATIVE_TEXT = randomChars(CHARS_SEQUENCE, RANDOM_CHARS_NUMBER)
const SCRAMBLE_DECORATIVE_TEXT_PARAMS = {
  speed: 0.55,
  tick: 3,
  step: 1,
  scramble: 10,
  overflow: true,
  overdrive: false,
} as const

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

const Steps: FC = () => {
  /** @references */
  const scrambleTimeoutRef = useRef<number | null>(null) // Ref to animation timeout for decoration text
  const squareTimeoutRef = useRef<number | null>(null) // Ref to animation timeout for square

  /** @states */
  const [activeNavigateItem, setActiveNavigateItem] = useState<number>(INITIAL_ACTIVE_NAVIGATE_ITEM) // Stores the active state of the `Step`

  // Memoize the active `Step` for search optimization
  const activeStep = useMemo(() => STEPS_CONTENTS.find(sp => sp.id === activeNavigateItem), [activeNavigateItem])

  const { ref: decorativeTextRef, replay: scrambleReplay } = useScramble({
    text: SCRAMBLE_DECORATIVE_TEXT,
    range: [33, 43],
    onAnimationEnd: () => {
      const timeout = randomBetween(10_500, 14_000)
      runWithTimeout(scrambleTimeoutRef, scrambleReplay, timeout)
    },
    ...SCRAMBLE_DECORATIVE_TEXT_PARAMS,
  })

  const { ref: descriptionRef } = useScramble({
    text: activeStep?.description || "",
    ...SCRAMBLE_DESCRIPTION_PARAMS,
  })

  const { ref: squareRef, replay: squareReplay } = useRotator({
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
      <p className='steps__decorative-text-1'>{"&//="}</p>
      <div className='steps__navigate'>
        {STEPS_CONTENTS.map((stepContent, _) => (
          <div
            key={stepContent.id}
            className={`steps__navigate-btn ${activeNavigateItem === stepContent.id ? "active" : ""}`}
            onClick={() => setActiveNavigateItem(stepContent.id)}
          >
            {`0${stepContent.id}`}
          </div>
        ))}
      </div>
      <div className='steps__decorative-square' ref={squareRef}></div>

      <div className='steps__slider-title-container'>
        <p className='steps__slider-title-value'>{`/0${activeNavigateItem}`}</p>
        <h3 className='steps__slider-title'>Development</h3>
      </div>

      <div className='steps__slider-description-container'>
        <p className='steps__slider-description'>
          Not everybody has an experienced frontend developer on their team. By joining our Discord server you can pick
          my brain with any frontend related questions. These one-on-one sessions give you direct access to my time and
          knowledge
        </p>
        <div className='steps__slider-description-list'>
          <p>{"Learning to find.............[ ok ]"}</p>
          <p>{"Learning to find.............[ ok ]"}</p>
          <p>{"Learning to find.............[ ok ]"}</p>
        </div>
      </div>

      <p className='steps__decorative-text-2' ref={decorativeTextRef}></p>

      <p className='steps__abstract-description'>These sessions give you direct</p>
    </div>
  )
}

export default Steps
