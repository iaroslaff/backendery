import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { FC, useRef } from "react"

import { useBreakpoints } from "../../hooks/useBreakpoints"

import "./Steps.scss"

const Steps: FC = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const spanRef = useRef<HTMLDivElement>(null)

  const { isTablet } = useBreakpoints()

  useGSAP(
    () => {
      spanRef.current &&
        gsap.fromTo(
          textRef.current,
          { x: -spanRef.current.clientWidth + "px" },
          { x: 0, duration: isTablet ? 5 : 10, repeat: -1, ease: "none" }
        )
    },
    { scope: textRef }
  )

  return (
    <section className={"steps__section"}>
      <h2 className={"steps__title"} ref={textRef}>
        <span ref={spanRef}>Steps</span>
        <span>Steps</span>
        <span>Steps</span>
        <span>Steps</span>
        <span>Steps</span>
        <span>Steps</span>
      </h2>
      <div className={"steps__container"}>
        <div className={"steps__step steps__step--1"}>
          <h4 className={"tile-step__title"}>
            <span>01.</span> Analysis
          </h4>
          <p className={"tile-step__description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>
        <div className={"steps__step steps__step--2"}>
          <h4 className={"tile-step__title"}>
            <span>02.</span> Development
          </h4>
          <p className={"tile-step__description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>
        <div className={"steps__step steps__step--3"}>
          <h4 className={"tile-step__title"}>
            <span>03.</span> Testing
          </h4>
          <p className={"tile-step__description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>
        <div className={"steps__step steps__step--4"}>
          <h4 className={"tile-step__title"}>
            <span>04.</span> Stagning
          </h4>
          <p className={"tile-step__description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>
        <div className={"steps__step steps__step--5"}>
          <h4 className={"tile-step__title"}>
            <span>05.</span> Release
          </h4>
          <p className={"tile-step__description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>
        <p className={"steps__text"}>
          We always try <br /> to follow <span>the sequence of work</span>
        </p>
      </div>
    </section>
  )
}

export default Steps
