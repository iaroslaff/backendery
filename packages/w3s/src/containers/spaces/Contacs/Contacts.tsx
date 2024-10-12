import React, { FC, useEffect, useRef } from "react"
import toast, { Toaster } from "react-hot-toast"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import AnimateRadixGrid from "../../../components/AnimateRadixGrid/AnimateRadixGrid"
import { SvgIcon } from "../../../components/elements/Icon"
import { useRotator } from "../../../hooks/useRotator"
import { randomBetween, randomChars, runWithTimeout } from "../../../utils/fn"

import "./Contacts.scss"

const CHARS_SEQUENCE = "1234567890ABCDEF!@#$%^&*_+[]{}<>?/~" as string
const RANDOM_CHARS_NUMBER = (1 << 3) as number

const SCRAMBLE_CHARS = randomChars(CHARS_SEQUENCE, RANDOM_CHARS_NUMBER)
const SCRAMBLE_PARAMS = {
  speed: 0.45,
  tick: 1,
  step: 1,
  scramble: 12,
  seed: 0,
  overflow: true,
  overdrive: false,
}

const Contacts: FC = () => {
  /** @references */
  const scrambleTimeoutRef = useRef<number | null>(null) // Ref to animation timeout for text
  const squareTimeoutRef = useRef<number | null>(null) // Ref to animation timeout for square

  const { ref: textRef, replay: scrambleReplay } = useScramble({
    text: SCRAMBLE_CHARS,
    onAnimationEnd: () => {
      const timeout = randomBetween(4_100, 7_550)
      runWithTimeout(scrambleTimeoutRef, scrambleReplay, timeout)
    },
    ...SCRAMBLE_PARAMS
  })

  const { ref: squareRef, replay: squareReplay } = useRotator({
    duration: 1_100,
    randomizeRotation: true,
    onAnimationEnd: () => {
      const timeout = randomBetween(4_000, 9_700)
      runWithTimeout(squareTimeoutRef, squareReplay, timeout)
    },
  })

  useEffect(() => {
    // Schedule the first animation when mounting the component
    runWithTimeout(scrambleTimeoutRef, scrambleReplay)

    // Clear the timeout when the component is unmounted
    return () => {
      if (scrambleTimeoutRef.current) {
        clearTimeout(scrambleTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Schedule the first animation when mounting the component
    runWithTimeout(squareTimeoutRef, squareReplay)

    // Clear the timeout when the component is unmounted
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
        <div className='contacts__decorative-square' ref={squareRef}></div>
        <p className='contacts__decorative-text' ref={textRef}></p>
      </div>
      <div className='contacts__email-wrapper'>
        <p className='contacts__email-description'>Not everybody has an experienced backend developer... write to us</p>
        <p
          className='contacts__email-address'
          onClick={(event: React.MouseEvent): void => {
            navigator.clipboard
              .writeText(event.currentTarget.textContent?.trim() ?? "")
              .then(() => {
                toast("Address copied")
              })
              .catch(err => {
                toast("Address not copied :/")
                console.log("couldn't copy to clipboard", err)
              })
          }}
        >
          hey@backendery.dev
        </p>
        <Toaster
          toastOptions={{
            duration: 1_000,
            position: "bottom-center",
            style: {
              backgroundColor: "#ffffff",
              borderRadius: 0,
              color: "#141519",
              animation: "none",
            },
          }}
        />
      </div>
      <div className='contacts__social-wrapper'>
        <a className='contacts__social-link' href='#'>
          Telegram
          <SvgIcon name='arrow-up' />
        </a>
        <a className='contacts__social-link' href='#'>
          GitHub
          <SvgIcon name='arrow-up' />
        </a>
      </div>
      <div className='contacts__animate-radix-grid-wrapper'>
        <AnimateRadixGrid
          symbols={["0", "1"]}
          rows={7}
          cols={3}
          minInterval={1_200}
          maxInterval={2_550}
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
