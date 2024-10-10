import React, { FC, useEffect, useRef, useState } from "react"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import { useRotator } from "../../../hooks/useRotator"
import { randomBetween, randomChars, runWithTimeout } from "../../../utils/fn"

import "./AboutUs.scss"

const CHARS_SEQUENCE = "1234567890ABCDEF!@#$%^&*_+[]{}<>?/~" as string
const RANDOM_CHARS_NUMBER = (24 >> 1) as number

const SCRAMBLE_CHARS = randomChars(CHARS_SEQUENCE, RANDOM_CHARS_NUMBER)

const AboutUs: FC = () => {
  /** refs */
  const scrambleTimeoutRef = useRef<number | null>(null)
  const lowerSquareTimeoutRef = useRef<number | null>(null)
  const upperSquareTimeoutRef = useRef<number | null>(null)

  /** states */
  const [imageSrc, setImageSrc] = useState<string>("")

  const { ref: textRef, replay: scrambleReplay } = useScramble({
    text: SCRAMBLE_CHARS,
    speed: 0.55,
    tick: 3,
    step: 1,
    scramble: 10,
    overflow: true,
    overdrive: false,
    onAnimationEnd: () => {
      const timeout = randomBetween(7_500, 12_000)
      runWithTimeout(scrambleTimeoutRef, scrambleReplay, timeout)
    },
  })

  const { ref: lowerSquareRef, replay: lowerSquareReplay } = useRotator({
    angle: 90,
    direction: "right",
    duration: 200,
    onAnimationEnd: () => {
      const timeout = randomBetween(3_500, 7_000)
      runWithTimeout(lowerSquareTimeoutRef, lowerSquareReplay, timeout)
    },
  })

  const { ref: upperSquareRef, replay: upperSquareReplay } = useRotator({
    angle: 180,
    direction: "left",
    duration: 400,
    onAnimationEnd: () => {
      const timeout = randomBetween(2_200, 5_800)
      runWithTimeout(upperSquareTimeoutRef, upperSquareReplay, timeout)
    },
  })

  useEffect(() => {
    /** schedule the first animation when mounting the component */
    runWithTimeout(scrambleTimeoutRef, scrambleReplay)

    /** clear the timeout when the component is unmounted */
    return () => {
      if (scrambleTimeoutRef.current) {
        clearTimeout(scrambleTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    /** schedule the first animation when mounting the component */
    runWithTimeout(lowerSquareTimeoutRef, lowerSquareReplay)

    /** clear the timeout when the component is unmounted */
    return () => {
      if (lowerSquareTimeoutRef.current) {
        clearTimeout(lowerSquareTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    /** schedule the first animation when mounting the component */
    runWithTimeout(upperSquareTimeoutRef, upperSquareReplay)

    /** clear the timeout when the component is unmounted */
    return () => {
      if (upperSquareTimeoutRef.current) {
        clearTimeout(upperSquareTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    import("../../../assets/images/founder.jpg").then(image => {
      setImageSrc(image.default)
    })
  }, [])

  return (
    <div className='about-us'>
      <h2 className='about-us__title'>
        <Typed strings={["About Us"]} typeSpeed={50} cursorChar='_' showCursor={true} startWhenVisible />
      </h2>
      <div className='about-us__description-wrapper'>
        <p ref={textRef}></p>
        <p className='about-us__description'>
          <span className='about-us__description-bracket'>{"["}</span> Not everybody has an experienced frontend
          developer on their team. By joining our Discord server you can pick my brain with any frontend related
          questions.These one-on-one sessions give you direct access to my time and knowledge{" "}
          <span className='about-us__description-bracket'>{"]"}</span>
        </p>
      </div>
      <div className='about-us__stats'>
        <p className='about-us__stats-value'>27</p>
        <p className='about-us__stats-description'>./These sessions give you direct</p>
      </div>
      <div className='about-us__founder'>
        <div className='about-us__decorative-square-wrapper'>
          <div className='about-us__decorative-square' ref={lowerSquareRef}></div>
          <div className='about-us__decorative-square' ref={upperSquareRef}></div>
        </div>
        <div className='about-us__founder-bio'>
          <p className='about-us__founder-bio-name'>Jaroslav</p>
          <p className='about-us__founder-bio-description'>Founder, Software Engineer</p>
        </div>
        <div className='about-us__founder-image-wrapper'>
          {imageSrc ? (
            <img className='about-us__founder-image' src={imageSrc} alt="It's me" />
          ) : (
            <p>Uh, just a minute! Loading...</p>
          )}
        </div>
      </div>
      <p className='about-us__decorative-text'>{"[../]"}</p>
    </div>
  )
}

export default AboutUs
