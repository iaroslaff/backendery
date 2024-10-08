import React, { FC, useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import AnimateBinaryGrid from "../../../components/AnimateBinaryGrid/AnimateBinaryGrid"
import { SvgIcon } from "../../../components/elements/Icon"
import { useRotator } from "../../../hooks/useRotator"
import { randomChars, randomInterval } from "../../../utils/fn"

import "./Contacts.scss"

const CHARS_SEQUENCE = "1234567890ABCDEF!@#$%^&*_+[]{}<>?/~" as string
const RANDOM_CHARS_NUMBER = (1 << 3) as number

const Contacts: FC = () => {
  /** hooks */
  const { ref: textRef, replay: scrambleReplay } = useScramble({
    text: randomChars(CHARS_SEQUENCE, RANDOM_CHARS_NUMBER),
    speed: 0.25,
    scramble: 25,
    overflow: true,
    overdrive: false,
    onAnimationFrame: () => {
      textRef.current.textContent = randomChars(CHARS_SEQUENCE, RANDOM_CHARS_NUMBER)
    },
  })

  const { ref: squareRef, replay: squareReplay } = useRotator({
    duration: 1_100,
    randomizeRotation: true
  })

  useEffect(() => {
    /** set an interval for animating */
    /* prettier-ignore */
    const scrambleIntervalId = setInterval(() => { scrambleReplay() }, randomInterval(7_500, 15_000))

    /** set an interval for lower square animating */
    /* prettier-ignore */
    const  squareIntervalId =  setInterval(() => {   squareReplay() }, randomInterval(5_000, 10_000));

    /** clear the interval when the component is unmounted */
    return () => {
      ;[scrambleIntervalId, squareIntervalId].forEach(intervalId => {
        clearInterval(intervalId)
      })
    }
  }, [scrambleReplay, squareReplay])

  return (
    <div className='contacts'>
      <h2 className='contacts__title'>
        <Typed strings={["Contacts"]} typeSpeed={50} cursorChar='_' startWhenVisible />
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
      <div className='contacts__animate-binary-grid-wrapper'>
        <AnimateBinaryGrid
          symbols={["0", "1"]}
          rows={7}
          cols={3}
          minInterval={300}
          maxInterval={950}
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
