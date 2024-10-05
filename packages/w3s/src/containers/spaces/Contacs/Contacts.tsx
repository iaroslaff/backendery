import React, { FC } from "react"
import toast, { Toaster } from "react-hot-toast"

import AnimateBinaryGrid from "../../../components/AnimateBinaryGrid/AnimateBinaryGrid"
import { SvgIcon } from "../../../components/elements/Icon"
import { generateRandomSpecialChars } from "../../../utils/fn"

import "./Contacts.scss"

const RANDOM_SPECIAL_CHARS = 10 as number

const Contacts: FC = () => {
  return (
    <div className='contacts'>
      <h2 className='contacts__title'>Contacts_</h2>
      <div className='contacts__decorative-wrapper'>
        <div className='contacts__decorative-square'></div>
        <p className='contacts__decorative-text'>{generateRandomSpecialChars(RANDOM_SPECIAL_CHARS)}</p>
      </div>
      <div className='contacts__email-wrapper'>
        <p className='contacts__email-description'>Not everybody has an experienced backend developer... write to us</p>
        <p
          className='contacts__email-address'
          onClick={(event: React.MouseEvent): void => {
            navigator.clipboard
              .writeText(event.currentTarget.textContent?.trim() ?? "")
              .then(() => {
                toast("Copied!")
              })
              .catch(err => {
                toast("Couldn't copy :/")
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
