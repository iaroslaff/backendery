import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FC, useRef } from "react"

import { SvgIcon } from "../../components/elements/Icon"
import { useBreakpoints } from "../../hooks/useBreakpoints"

import "./WeDo.scss"

const WeDo: FC = () => {
  const { isPC, isTablet, isSmartphone } = useBreakpoints()

  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      let scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 45%",
      })

      gsap.from(".we-do__title", {
        duration: 0.85,
        ease: "power4.out",
        opacity: 0,
        scrollTrigger: scrollTrigger,
        y: 60,
      })

      scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 25%",
      })
      ;(isPC || isTablet) &&
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

      scrollTrigger = ScrollTrigger.create({
        end: "center 35%",
        start: "top bottom",
        trigger: sectionRef.current,
      })

      isSmartphone &&
        gsap.fromTo(
          ".we-do__card",
          {
            opacity: 0,
          },
          {
            ease: "expo.in",
            opacity: 1,
            scrollTrigger: scrollTrigger,
            stagger: 1.05,
          }
        )
    },
    { scope: sectionRef }
  )

  useGSAP(
    (_, contextSafe) => {
      const onMouseEnter =
        contextSafe &&
        contextSafe((event: MouseEvent) => {
          const elt = event.target as HTMLElement
          if (elt.classList.contains("we-do__card")) {
            const self = elt
            gsap.to(self, {
              backgroundColor: "rgba(254, 254, 255, 0.06)",
              duration: 0.19,
              ease: "none",
            })

            const paths = elt.querySelectorAll("svg > .visualizezza");
            paths.forEach(x => {
              x?.classList.add("_active")
            });

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
        contextSafe &&
        contextSafe((event: MouseEvent) => {
          const elt = event.target as HTMLElement
          if (elt.classList.contains("we-do__card")) {
            const self = elt
            gsap.to(self, {
              backgroundColor: "rgba(254, 254, 255, 0.02)",
              duration: 0.19,
              ease: "none",
            })

            const paths = elt.querySelectorAll("svg > .visualizezza");
            paths.forEach(x => {
              x?.classList.remove("_active")
            });

            const title = elt.querySelector(".we-do__card-title")
            gsap.to(title, {
              color: "rgb(254, 254, 255)",
              duration: 0.23,
              ease: "none",
              y: 0,
            })
          }
        })

      // prettier-ignore
      if (
           sectionRef.current
        && onMouseEnter
        && onMouseLeave
      ) {
        sectionRef.current.addEventListener("mouseenter", onMouseEnter, true)
        sectionRef.current.addEventListener("mouseleave", onMouseLeave, true)
      }

      // Cleanup event listeners on component unmount
      return () => {
        // prettier-ignore
        if (
             sectionRef.current
          && onMouseEnter
          && onMouseLeave
        ) {
          sectionRef.current.removeEventListener("mouseenter", onMouseEnter, true)
          sectionRef.current.removeEventListener("mouseleave", onMouseLeave, true)
        }
      }
    },
    { scope: sectionRef }
  )

  return (
    <section className={"we-do__section"} ref={sectionRef}>
      <h2 className={"we-do__title"}>
        What
        <br />
        we do
      </h2>
      <div className={"we-do__card"}>
        <div className={"we-do__card-heading-decoration"}>
          <SvgIcon name={"we-do-server-applications"} />
        </div>
        <h4 className={"we-do__card-title"}>Server Applications</h4>
        <p className={"we-do__card-description"}>
          Development and optimization of server applications for high performance and reliability
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-heading-decoration"}>
          <SvgIcon name={"we-do-api"} />
        </div>
        <h4 className={"we-do__card-title"}>API&apos;s</h4>
        <p className={"we-do__card-description"}>
          Create reliable and scalable API&apos;s for your applications and provide secure and fast integration
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-heading-decoration"}>
          <SvgIcon name={"we-do-service-integrations"} />
        </div>
        <h4 className={"we-do__card-title"}>Service Integrations</h4>
        <p className={"we-do__card-description"}>
          Integration of various services to improve business processes and increase operational efficiency
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-heading-decoration"}>
          <SvgIcon name={"we-do-automation-tools"} />
        </div>
        <h4 className={"we-do__card-title"}>Automation Tools</h4>
        <p className={"we-do__card-description"}>
          Development automation tools to improve efficiency and reduce time costs
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-heading-decoration"}>
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
