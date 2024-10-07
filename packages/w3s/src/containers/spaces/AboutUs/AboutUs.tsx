import { FC, useEffect, useState } from "react"
import { useScramble } from "use-scramble"

import { useRotator } from "../../../hooks/useRotator"
import { randomChars, randomInterval } from "../../../utils/fn"

import "./AboutUs.scss"

const CHARS_SEQUENCE = "1234567890ABCDEF!@#$%^&*_+[]{}<>?/~" as string
const RANDOM_CHARS_NUMBER = (24 >> 1) as number

const AboutUs: FC = () => {
  /** states */
  const [imageSrc, setImageSrc] = useState<string>("")

  /** hooks */
  const { ref: textRef, replay: scrambleReplay } = useScramble({
    text: randomChars(CHARS_SEQUENCE, RANDOM_CHARS_NUMBER),
    speed: 0.25,
    scramble: 15,
    overflow: true,
    overdrive: false,
    onAnimationFrame: () => {
      textRef.current.textContent = randomChars(CHARS_SEQUENCE, RANDOM_CHARS_NUMBER)
    },
  })

  const { ref: lwSquareRef, replay: lwSquareReplay } = useRotator({
    angle: 90,
    direction: "right",
    duration: 1_350,
  })

  const { ref: upSquareRef, replay: upSquareReplay } = useRotator({
    angle: 270,
    direction: "left",
    duration: 1_700,
  })

  useEffect(() => {
    /** set an interval for scramble animating */
    /* prettier-ignore */
    const scrambleIntervalId = setInterval(() => { scrambleReplay() }, randomInterval(7_000, 15_000))

    /** set an interval for lower square animating */
    /* prettier-ignore */
    const lwSquareIntervalId = setInterval(() => { lwSquareReplay() }, randomInterval(4_000, 7_000));

    /** set an interval for lower square animating */
    /* prettier-ignore */
    const upSquareIntervalId = setInterval(() => { upSquareReplay() }, randomInterval(3_500, 8_200));

    /** clear the interval when the component is unmounted */
    return () => {
      ;[scrambleIntervalId, lwSquareIntervalId, upSquareIntervalId].forEach(intervalId => {
        clearInterval(intervalId)
      })
    }
  }, [scrambleReplay, lwSquareReplay, upSquareReplay])

  useEffect(() => {
    import("../../../assets/images/founder.jpg").then(image => {
      setImageSrc(image.default)
    })
  }, [])

  return (
    <div className='about-us'>
      <h2 className='about-us__title'>About_</h2>
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
          <div className='about-us__decorative-square' ref={lwSquareRef}></div>
          <div className='about-us__decorative-square' ref={upSquareRef}></div>
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
