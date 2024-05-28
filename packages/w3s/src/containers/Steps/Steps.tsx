import { useGSAP } from "@gsap/react"
import gsap from "gsap"
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FC, useRef } from "react"

import { useBreakpoints } from "../../hooks/useBreakpoints"

import "./Steps.scss"

const Steps: FC = () => {
  const { isPC } = useBreakpoints()

  const stepsSectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { x: -textRef.current.clientWidth + "px" },
          { x: 0, duration: isPC ? 25 : 5, repeat: -1, ease: "none" }
        )
      }

      gsap.fromTo(
        ".steps__card",
        {
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: ".steps__container",
            start: "top bottom",
            end: isPC ? "center 35%" : "center 25%",
            markers: true,
          },
          duration: 0.85,
          ease: "expo.in",
          opacity: 1,
          stagger: 1.05,
        }
      )

      gsap.from(".steps__text", {
        duration: 1.25,
        ease: "power4.out",
        opacity: 0,
        scrollTrigger: {
          trigger: ".steps__text",
          start: "top center",
        },
        y: 80,
      })
    },
    { scope: stepsSectionRef }
  )

  return (
    <section className={"steps__section"} ref={stepsSectionRef}>
      <h2 className={"steps__title"} ref={textRef}>
        <span ref={spanRef}>steps</span>
        {Array.from({ length: 5 }, (_, key) => (
          <span key={key}>steps</span>
        ))}
      </h2>
      <div className={"steps__container"}>
        <div className={"steps__card steps__card--01"}>
          <h4 className={"steps__card-title"}>
            <span>01.</span> Analysis
          </h4>
          <p className={"steps__card-description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>

        <div className={"steps__card steps__card--02"}>
          <h4 className={"steps__card-title"}>
            <span>02.</span> Development
          </h4>
          <p className={"steps__card-description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>

        <div className={"steps__card steps__card--03"}>
          <h4 className={"steps__card-title"}>
            <span>03.</span> Testing
          </h4>
          <p className={"steps__card-description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>

        <div className={"steps__card steps__card--04"}>
          <h4 className={"steps__card-title"}>
            <span>04.</span> Stagning
          </h4>
          <p className={"steps__card-description"}>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>

        <div className={"steps__card steps__card--05"}>
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
