import { FC, useEffect, useRef } from "react"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import AnimateRadixGrid from "../../../components/AnimateRadixGrid/AnimateRadixGrid"
import { SvgIcon } from "../../../components/elements/Icon"
import { useRotator } from "../../../hooks/useRotator"
import { randomBetween, randomChars, runWithTimeout } from "../../../utils/fn"

import "./Contacts.scss"

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

const Contacts: FC = () => {
  /** @references */
  const scrambleTimeoutRef = useRef<number | null>(null)
  const squareTimeoutRef = useRef<number | null>(null)

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

  const { ref: decorativeSquareRef, replay: squareReplay } = useRotator({
    duration: 1_100,
    randomizeRotation: true,
    onAnimationEnd: () => {
      const timeout = randomBetween(4_000, 9_700)
      runWithTimeout(squareTimeoutRef, squareReplay, timeout)
    },
  })

  useEffect(() => {
    runWithTimeout(scrambleTimeoutRef, scrambleReplay)

    return () => {
      if (scrambleTimeoutRef.current) {
        clearTimeout(scrambleTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    runWithTimeout(squareTimeoutRef, squareReplay)

    return () => {
      if (squareTimeoutRef.current) {
        clearTimeout(squareTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className='contacts'>
      <h2 className='contacts__title'>
        <Typed strings={["Contacts"]} typeSpeed={50} cursorChar='_' showCursor={true} startWhenVisible />
      </h2>
      <div className='contacts__decorative-wrapper'>
        <div className='contacts__decorative-square' ref={decorativeSquareRef}></div>
        <p className='contacts__decorative-text' ref={decorativeTextRef}></p>
      </div>
      <div className='contacts__email-wrapper'>
        <p className='contacts__email-description'>{"Not everybody has an experienced backend developer... write to us"}</p>
        <a className='contacts__email-address' href='mailto:hey@backendery.io'>
          {"hey@backendery.io"}
        </a>
      </div>
      <div className='contacts__social-wrapper'>
        <a className='contacts__social-link' href='#'>
          {"Telegram"}
          <SvgIcon name='arrow-up' />
        </a>
        <a className='contacts__social-link' href='#'>
          {"GitHub"}
          <SvgIcon name='arrow-up' />
        </a>
      </div>
      <div className='contacts__decorative-animate-radix-grid-wrapper'>
        <AnimateRadixGrid
          symbols={["0", "1"]}
          rows={7}
          cols={3}
          minInterval={350}
          maxInterval={700}
          unreachableCells={[
            [3, 1],
            [4, 1],
            [5, 1],
            [6, 1],
            [4, 2],
            [5, 2],
            [6, 2],
          ]}
        />
      </div>
    </div>
  )
}

export default Contacts
