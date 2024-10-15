import React, { FC, useMemo, useRef, useState } from "react"
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

const stepsContents: IStepsContents[] = [
  {
    id: 1,
    title: "Analysis",
    description:
      "At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the project 1",
  },
  {
    id: 2,
    title: "Development",
    description:
      "At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the project 2",
  },
  {
    id: 3,
    title: "Testing",
    description:
      "At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the project 3",
  },
  {
    id: 4,
    title: "Staging",
    description:
      "At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the project 4",
  },
  {
    id: 5,
    title: "Release",
    description:
      "At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the project 5",
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
      <div className='steps__decorative-square' ref={squareRef}></div>
      <div className='steps__step-title-wrapper'>
        <p className='steps__step-title-navigate-item'>{`/0${activeStep?.id}`}</p>
        <h3 className='steps__step-title'>{activeStep?.title}</h3>
      </div>
      <div className='steps__step-description-wrapper'>
        <p className='steps__step-description' ref={descriptionRef}>
          {activeStep?.description}
        </p>
      </div>
      <p className='steps__decorative-text--scramble' ref={scrambleDecorativeTextRef}></p>
      <p className='steps__decorative-abstract-phrase'>These sessions give you direct</p>
    </div>
  )
}

export default Steps
