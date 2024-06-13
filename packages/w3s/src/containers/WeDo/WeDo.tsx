import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FC, useRef } from "react"

import { SvgIcon } from "../../components/elements/Icon"
import { useBreakpoints } from "../../hooks/useBreakpoints"

import "./WeDo.scss"

enum AnimationState {
  Start = 0x00_00_00_01,
  Stop,
}

function animateSvg(elt: HTMLElement, state: AnimationState = AnimationState.Start): void {
  const paths = elt.querySelectorAll("svg > .visualizezza")
  paths.forEach(x => {
    switch (state) {
      case AnimationState.Start: {
        x && x.classList.add("_active")
        return
      }
      case AnimationState.Stop: {
        x && x.classList.remove("_active")
        return
      }
      default:
        throw new Error("an unknown animation state is specified")
    }
  })
}

function changeCardColor(elt: HTMLElement, color: string): void {
  gsap.to(elt, {
    backgroundColor: color,
    duration: 0.19,
    ease: "none",
  })
}

const WeDo: FC = () => {
  /** hooks */
  const { isSmartphone, isTablet, isSmallLaptop, isLaptop, isPC } = useBreakpoints()

  /** refs */
  const refSection = useRef<HTMLElement>(null)
  const refTitle = useRef<HTMLHeadingElement>(null)

  /* prettier-ignore */
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      let scrollTrigger = null

      ;(isSmartphone || isTablet) && (
        // 1
        scrollTrigger = ScrollTrigger.create({
          trigger: refSection.current,
          start: "top 80%",
        }),
        // 2
        gsap.from(refTitle.current, {
          duration: 0.85,
          ease: "power4.out",
          opacity: 0,
          scrollTrigger: scrollTrigger,
          y: 60,
        }),
        // 3
        gsap.utils.toArray(".we-do__card").forEach(x => {
          const card = x as HTMLElement
          card.classList.add("_no-tap")

          scrollTrigger = ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            end: "top 75%",
          })
          gsap.fromTo(
            card,
            {
              opacity: 0,
            },
            {
              duration: 0.85,
              ease: "expo.in",
              opacity: 1,
              scrollTrigger: scrollTrigger,
              stagger: 0.25,
            }
          )
          ScrollTrigger.create({
            trigger: card,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              changeCardColor(card, "rgba(254, 254, 255, 0.06)"); animateSvg(card)
            },
            onEnterBack: () => {
              changeCardColor(card, "rgba(254, 254, 255, 0.06)"); animateSvg(card)
            },
            onLeave: () => {
              changeCardColor(card, "rgba(254, 254, 255, 0.02)"); animateSvg(card, AnimationState.Stop)
            },
            onLeaveBack: () => {
              changeCardColor(card, "rgba(254, 254, 255, 0.02)"); animateSvg(card, AnimationState.Stop)
            },
          })
        })
      )

      ;(isSmallLaptop || isLaptop || isPC) && (
        // 1
        scrollTrigger = ScrollTrigger.create({
          trigger: refSection.current,
          start: "top center",
        }),
        // 2
        gsap.from(refTitle.current, {
          duration: 0.85,
          ease: "power4.out",
          opacity: 0,
          scrollTrigger: scrollTrigger,
          y: 60,
        }),
        // 3
        scrollTrigger = ScrollTrigger.create({
          trigger: refSection.current,
          start: "top 25%",
        }),
        // 4
        gsap.from(".we-do__card", {
          ease: "power4.out",
          opacity: 0,
          scrollTrigger: scrollTrigger,
          stagger: {
            each: 0.25,
            from: "random",
            grid: [2, 3],
          },
          y: 40,
        })
      )
    },
    { scope: refSection }
  )

  /* prettier-ignore */
  useGSAP(
    (_, contextSafe) => {
      const onMouseEnter =
           contextSafe
        && contextSafe((event: MouseEvent) => {
          const elt = event.target as HTMLElement
          if (elt.classList.contains("we-do__card")) {
            const card = elt

            changeCardColor(card, "rgba(254, 254, 255, 0.06)"); animateSvg(card)

            const title = elt.querySelector(".we-do__card-title")
            gsap.to(title, {
              color: "rgb(247, 173, 25)",
              duration: 0.23,
              ease: "none",
              y: -5,
            })
          }
        })

      const onMouseLeave =
           contextSafe
        && contextSafe((event: MouseEvent) => {
          const elt = event.target as HTMLElement
          if (elt.classList.contains("we-do__card")) {
            const card = elt

            changeCardColor(card, "rgba(254, 254, 255, 0.02)"); animateSvg(card, AnimationState.Stop)

            const title = elt.querySelector(".we-do__card-title")
            gsap.to(title, {
              color: "rgb(254, 254, 255)",
              duration: 0.23,
              ease: "none",
              y: 0,
            })
          }
        })

      if (
           refSection.current
        && onMouseEnter
        && onMouseLeave
      ) {
        refSection.current.addEventListener("mouseenter", onMouseEnter, true)
        refSection.current.addEventListener("mouseleave", onMouseLeave, true)
      }

      // cleanup event listeners on component unmount
      return () => {
        if (
             refSection.current
          && onMouseEnter
          && onMouseLeave
        ) {
          refSection.current.removeEventListener("mouseenter", onMouseEnter, true)
          refSection.current.removeEventListener("mouseleave", onMouseLeave, true)
        }
      }
    },
    { scope: refSection }
  )

  return (
    <section className={"we-do__section"} ref={refSection}>
      <h2 className={"we-do__title"} ref={refTitle}>
        What
        <br />
        we do
      </h2>
      <div className={"we-do__card"}>
        <div className={"we-do__card-icon"}>
          <SvgIcon name={"we-do-server-applications"} />
        </div>
        <h4 className={"we-do__card-title"}>Server Applications</h4>
        <p className={"we-do__card-description"}>
          Development and optimization of server applications for high performance and reliability
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-icon"}>
          <SvgIcon name={"we-do-api"} />
        </div>
        <h4 className={"we-do__card-title"}>API&apos;s</h4>
        <p className={"we-do__card-description"}>
          Create reliable and scalable API&apos;s for your applications and provide secure and fast integration
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-icon"}>
          <SvgIcon name={"we-do-service-integrations"} />
        </div>
        <h4 className={"we-do__card-title"}>Service Integrations</h4>
        <p className={"we-do__card-description"}>
          Integration of various services to improve business processes and increase operational efficiency
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-icon"}>
          <SvgIcon name={"we-do-automation-tools"} />
        </div>
        <h4 className={"we-do__card-title"}>Automation Tools</h4>
        <p className={"we-do__card-description"}>
          Development automation tools to improve efficiency and reduce time costs
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-icon"}>
          <SvgIcon name={"we-do-bots"} />
        </div>
        <h4 className={"we-do__card-title"}>Bots</h4>
        <p className={"we-do__card-description"}>
          Development bots for chat, news and other tasks, providing automation and ease of interaction
        </p>
      </div>
    </section>
  )
}

export default WeDo
