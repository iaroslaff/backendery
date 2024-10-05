import React, { FC, useEffect, useRef } from "react"
import toast, { Toaster } from "react-hot-toast"
/* @ts-ignore */
import shuffleLetters from "shuffle-letters"

import AnimateBinaryGrid from "../../../components/AnimateBinaryGrid/AnimateBinaryGrid"
import { SvgIcon } from "../../../components/elements/Icon"
import { generateRandomSpecialChars } from "../../../utils/fn"

import "./Contacts.scss"

const RANDOM_SPECIAL_CHARS = (1 << 3) as number // 1 byte
const SHUFFLE_LETTERS_INTERVAL = 9_500 as number

const Contacts: FC = () => {
  /** refs */
  const textRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    /** initial chars set */
    const initialChars = generateRandomSpecialChars(RANDOM_SPECIAL_CHARS)
    if (textRef.current) {
      textRef.current.textContent = initialChars
    }

    const intervalId = setInterval(() => {
      /** generating a new chars set */
      const chars = generateRandomSpecialChars(RANDOM_SPECIAL_CHARS)

      if (textRef.current) {
        /** update element text before animation */
        textRef.current.textContent = chars
        /** run animation shuffleLetters */
        shuffleLetters(textRef.current, {
          fps: 12,
          iterations: 20,
        })
      }
    }, SHUFFLE_LETTERS_INTERVAL)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='contacts'>
      <h2 className='contacts__title'>Contacts_</h2>
      <div className='contacts__decorative-wrapper'>
        <div className='contacts__decorative-square'></div>
        <p className='contacts__decorative-text' ref={textRef}>
          {textRef.current?.textContent}
        </p>
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
            duration: 3000,
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
