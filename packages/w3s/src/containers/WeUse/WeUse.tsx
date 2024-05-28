import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FC, useRef } from "react"

import { SvgIcon } from "../../components/elements/Icon"
// import { useBreakpoints } from "../../hooks/useBreakpoints"

import "./WeUse.scss"

const WeUse: FC = () => {
  // const { isPC, isTablet, isSmartphone } = useBreakpoints()

  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 5%",
        end: "bottom 63%",
        endTrigger: cardsRef.current,
        pinSpacing: false,
        pin: true,
      })

      ScrollTrigger.create({
        trigger: descriptionRef.current,
        start: "center center",
        end: "bottom 63%",
        endTrigger: cardsRef.current,
        pinSpacing: false,
        pin: true,
      })

      let scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 45%",
      })

      gsap.from(titleRef.current, {
        duration: 0.85,
        ease: "power4.out",
        opacity: 0,
        scrollTrigger: scrollTrigger,
        y: 60,
      })

      gsap.utils.toArray(".we-use__card").forEach(x => {
        const card = x as HTMLElement

        scrollTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          end: "top 30%",
        })

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
          },
          {
            ease: "expo.in",
            opacity: 1,
            stagger: 6.05,
            // duration: 0.35,
            scrollTrigger: scrollTrigger,
            y: 0,
          }
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section className={"we-use__section"} ref={sectionRef}>
      <div className={"we-use__heading"}>
        <h2 className={"we-use__heading-title"} ref={titleRef}>
          We use
        </h2>
        <p className={"we-use__heading-description"} ref={descriptionRef}>
          We cover the full range of services for analysis, <span>development and support of your online business</span>
        </p>
      </div>
      <div className={"we-use__cards"} ref={cardsRef}>
        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Language</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Framework</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Database</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Message Queue</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Testing</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Documentation</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Containerization</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"we-use-language-rust"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeUse
