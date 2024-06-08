import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FC, useRef } from "react"

import { SvgIcon } from "../../components/elements/Icon"
import { useBreakpoints } from "../../hooks/useBreakpoints"

import "./WeDo.scss"

const WeDo: FC = () => {
  const { isSmartphone, isTablet, isSmallLaptop, isLaptop, isPC } = useBreakpoints()

  const tagSectionRef = useRef<HTMLElement>(null)
  const tagTitleRef = useRef<HTMLHeadingElement>(null)

  function letsAnimateSvg(elt: HTMLElement): void {
    const paths = elt.querySelectorAll("svg > .visualizezza")
    paths.forEach(x => {
      x?.classList.add("_active")
    })
  }

  function stopAnimateSvg(elt: HTMLElement): void {
    const paths = elt.querySelectorAll("svg > .visualizezza")
    paths.forEach(x => {
      x?.classList.remove("_active")
    })
  }

  function letsChangeCardColor(elt: HTMLElement, color: string): void {
    gsap.to(elt, {
      backgroundColor: color,
      duration: 0.19,
      ease: "none",
    })
  }

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      let scrollTrigger = null

      ;(isSmartphone || isTablet) &&
        ((scrollTrigger = ScrollTrigger.create({
          trigger: tagSectionRef.current,
          start: "top 80%",
        })),
        gsap.from(tagTitleRef.current, {
          duration: 0.85,
          ease: "power4.out",
          opacity: 0,
          scrollTrigger: scrollTrigger,
          y: 60,
        }),
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
              letsChangeCardColor(card, "rgba(254, 254, 255, 0.06)")
              letsAnimateSvg(card)
            },
            onEnterBack: () => {
              letsChangeCardColor(card, "rgba(254, 254, 255, 0.06)")
              letsAnimateSvg(card)
            },
            onLeave: () => {
              letsChangeCardColor(card, "rgba(254, 254, 255, 0.02)")
              stopAnimateSvg(card)
            },
            onLeaveBack: () => {
              letsChangeCardColor(card, "rgba(254, 254, 255, 0.02)")
              stopAnimateSvg(card)
            },
          })
        }))
      ;(isSmallLaptop || isLaptop || isPC) &&
        ((scrollTrigger = ScrollTrigger.create({
          trigger: tagSectionRef.current,
          start: "top center",
        })),
        gsap.from(tagTitleRef.current, {
          duration: 0.85,
          ease: "power4.out",
          opacity: 0,
          scrollTrigger: scrollTrigger,
          y: 60,
        }),
        (scrollTrigger = ScrollTrigger.create({
          trigger: tagSectionRef.current,
          start: "top 25%",
        })),
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
        }))
    },
    { scope: tagSectionRef }
  )

  useGSAP(
    (_, contextSafe) => {
      const onMouseEnter =
        contextSafe &&
        contextSafe((event: MouseEvent) => {
          const elt = event.target as HTMLElement
          if (elt.classList.contains("we-do__card")) {
            const card = elt

            letsChangeCardColor(card, "rgba(254, 254, 255, 0.06)")
            letsAnimateSvg(card)

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
            const card = elt

            letsChangeCardColor(card, "rgba(254, 254, 255, 0.02)")
            stopAnimateSvg(card)

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
           tagSectionRef.current
        && onMouseEnter
        && onMouseLeave
      ) {
        tagSectionRef.current.addEventListener("mouseenter", onMouseEnter, true)
        tagSectionRef.current.addEventListener("mouseleave", onMouseLeave, true)
      }

      // Cleanup event listeners on component unmount
      return () => {
        // prettier-ignore
        if (
             tagSectionRef.current
          && onMouseEnter
          && onMouseLeave
        ) {
          tagSectionRef.current.removeEventListener("mouseenter", onMouseEnter, true)
          tagSectionRef.current.removeEventListener("mouseleave", onMouseLeave, true)
        }
      }
    },
    { scope: tagSectionRef }
  )

  return (
    <section className={"we-do__section"} ref={tagSectionRef}>
      <h2 className={"we-do__title"} ref={tagTitleRef}>
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
