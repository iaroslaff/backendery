// import { useGSAP } from "@gsap/react"
// import gsap from "gsap"
import { FC, useRef } from "react"

// import { useBreakpoints } from "../../hooks/useBreakpoints"

import "./Steps.scss"

const Steps: FC = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const spanRef = useRef<HTMLDivElement>(null)

  // const { isTablet } = useBreakpoints()

  // useGSAP(
  //   () => {
  //     spanRef.current &&
  //       gsap.fromTo(
  //         textRef.current,
  //         { x: -spanRef.current.clientWidth + "px" },
  //         { x: 0, duration: isTablet ? 5 : 10, repeat: -1, ease: "none" }
  //       )
  //   },
  //   { scope: textRef }
  // )

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
        <div className={"steps__card steps__card--1"}>
          <h4 className={"steps__card-title"}>
            <span>01.</span> Analysis
          </h4>
          <p className={"steps__card-description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>

        <div className={"steps__card steps__card--2"}>
          <h4 className={"steps__card-title"}>
            <span>02.</span> Development
          </h4>
          <p className={"steps__card-description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>

        <div className={"steps__card steps__card--3"}>
          <h4 className={"steps__card-title"}>
            <span>03.</span> Testing
          </h4>
          <p className={"steps__card-description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>

        <div className={"steps__card steps__card--4"}>
          <h4 className={"steps__card-title"}>
            <span>04.</span> Stagning
          </h4>
          <p className={"steps__card-description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>

        <div className={"steps__card steps__card--5"}>
          <h4 className={"steps__card-title"}>
            <span>05.</span> Release
          </h4>
          <p className={"steps__card-description"}>
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
