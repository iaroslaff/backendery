import { FC, useEffect, useRef } from "react"
import { ReactTyped as Typed } from "react-typed"
import { useScramble } from "use-scramble"

import { useRotator } from "../../../hooks/useRotator"
import { randomBetween, randomChars, runWithTimeout } from "../../../utils/fn"

import "./AboutUs.scss"

const charsSequence = "1234567890ABCDEF!@#$%^&*_+[]{}<>?/~" as string
const randomCharsNumber = (24 >> 1) as number

const scrambleDecorativeTextParams = {
  speed: 0.55,
  tick: 3,
  step: 1,
  scramble: 10,
  overflow: true,
  overdrive: false,
}

const AboutUs: FC = () => {
  /** @references */
  const scrambleTimeoutRef = useRef<number | null>(null)
  const lowerSquareTimeoutRef = useRef<number | null>(null)
  const upperSquareTimeoutRef = useRef<number | null>(null)

  const { ref: scrambleDecorativeTextRef, replay: scrambleReplay } = useScramble({
    text: randomChars(charsSequence, randomCharsNumber),
    onAnimationEnd: () => {
      const timeout = randomBetween(7_500, 12_000)
      runWithTimeout(scrambleTimeoutRef, scrambleReplay, timeout)
    },
    ...scrambleDecorativeTextParams,
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
    const timeoutId = scrambleTimeoutRef.current
    runWithTimeout(scrambleTimeoutRef, scrambleReplay)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [scrambleReplay])

  useEffect(() => {
    const timeoutId = lowerSquareTimeoutRef.current
    runWithTimeout(lowerSquareTimeoutRef, lowerSquareReplay)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [lowerSquareReplay])

  useEffect(() => {
    const timeoutId = upperSquareTimeoutRef.current
    runWithTimeout(upperSquareTimeoutRef, upperSquareReplay)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [upperSquareReplay])

  return (
    <div className={"about-us"}>
      <h2 className={"about-us__title"}>
        <Typed strings={["About Us"]} typeSpeed={50} cursorChar={"_"} showCursor={true} startWhenVisible />
      </h2>
      <div className={"about-us__description-wrapper"}>
        <p className={"about-us__decorative-text--scramble"} ref={scrambleDecorativeTextRef}></p>
        {/* prettier-ignore */}
        <p className={"about-us__description"}>
          <span className={"about-us__description-bracket"}>{"["}</span>
          {`
            We're a small, friendly digital studio specializing in backend development. We focus on
            building reliable and efficient solutions, valuing close collaboration to understand each
            client's needs. We're committed to delivering high-quality results tailored to the unique
            goals of every project
          `}
          <span className={"about-us__description-bracket"}>{"]"}</span>
        </p>
      </div>
      <div className={"about-us__stats"}>
        <p className={"about-us__stats-value"}>{"10"}</p>
        <p className={"about-us__stats-description"}>
          {"./engineers"} <span>{"avg"}</span> {"years of experience"}
        </p>
      </div>
      <div className={"about-us__founder"}>
        <div className={"about-us__decorative-square-wrapper"}>
          <div className={"about-us__decorative-square"} ref={lowerSquareRef}></div>
          <div className={"about-us__decorative-square"} ref={upperSquareRef}></div>
        </div>
        <div className={"about-us__founder-bio"}>
          <p className={"about-us__founder-bio-name"}>{"Jaroslav"}</p>
          <p className={"about-us__founder-bio-description"}>
            {"Founder"}
            {","}
            {<br />}
            {"Software Engineer"}
          </p>
        </div>
        <div className={"about-us__founder-image-wrapper"}>
          <picture>
            <source className={"about-us__founder-image"} srcSet={"/assets/images/founder.webp"} type={"image/webp"} />
            <source className={"about-us__founder-image"} srcSet={"/assets/images/founder.avif"} type={"image/avif"} />
            <img
              className={"about-us__founder-image"}
              src={"/assets/images/founder.jpg"}
              alt={"It's me"}
              loading={"lazy"}
            />
          </picture>
        </div>
      </div>
      <p className={"about-us__decorative-text--static"}>{"[../]"}</p>
    </div>
  )
}

export default AboutUs
