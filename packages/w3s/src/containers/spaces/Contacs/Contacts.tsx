import React, { FC, useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useScramble } from "use-scramble"

import AnimateBinaryGrid from "../../../components/AnimateBinaryGrid/AnimateBinaryGrid"
import { SvgIcon } from "../../../components/elements/Icon"
import { generateRandomChars } from "../../../utils/fn"

import "./Contacts.scss"

const RANDOM_CHARS_NUMBER = (1 << 3) as number // 1 byte
/* prettier-ignore */
const RANDOM_CHARS_MAX_INTERVAL =  9_500 as number
const RANDOM_CHARS_MIN_INTERVAL = 15_000 as number

const Contacts: FC = () => {
  /** states */
  const [animationInterval, setAnimationInterval] = useState<number>(0)

  /** hooks */
  const { ref: textRef, replay } = useScramble({
    text: generateRandomChars(RANDOM_CHARS_NUMBER),
    speed: 0.65,
    scramble: 35,
    overflow: true,
    overdrive: false,
    onAnimationStart: () => {
      /** function to generate a random interval between updates */
      const randomInterval = () => {
        return (
          Math.floor(Math.random() * (RANDOM_CHARS_MAX_INTERVAL - RANDOM_CHARS_MIN_INTERVAL + 1)) +
          RANDOM_CHARS_MIN_INTERVAL
        )
      }

      /** generate an interval for animating chars */
      const interval = randomInterval()

      setAnimationInterval(interval)
    },
    onAnimationFrame: () => {
      textRef.current.textContent = generateRandomChars(RANDOM_CHARS_NUMBER)
    },
  })

  useEffect(() => {
    /** set an interval for animating chars */
    const interval = setInterval(replay, animationInterval)

    /** clear the interval when the component is unmounted */
    return () => clearInterval(interval)
  }, [animationInterval])

  return (
    <div className='contacts'>
      <h2 className='contacts__title'>Contacts_</h2>
      <div className='contacts__decorative-wrapper'>
        <div className='contacts__decorative-square'></div>
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
