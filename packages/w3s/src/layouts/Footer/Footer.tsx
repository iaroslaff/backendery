import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FC, useRef } from "react"

import { SvgIcon } from "../../components/elements/Icon"
import { useApp } from "../../contexts/App"
import { getElementWidth } from "../../utils/fn"

import "./Footer.scss"

/* prettier-ignore */
function _calcDecorationArrowXPosition(): number {
  const x: number = (
      getElementWidth(".footer__container")
    - getElementWidth(".footer__offer")) / 2
  const position: number = (getElementWidth(".footer__offer-decoration-arrow") + x) * -1;

  return position
}

const Footer: FC = () => {
  /** hooks */
  const { setLetsStartedFormVisibility } = useApp()

  /** refs */
  const refFooter = useRef<HTMLElement>(null)
  const refLetsStartProjectBtn = useRef<HTMLButtonElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const scrollTrigger = ScrollTrigger.create({
        trigger: refFooter.current,
        start: "top 60%",
      })

      gsap
        .timeline({ scrollTrigger: scrollTrigger })
        .fromTo(
          ".footer__offer-word",
          {
            opacity: 0,
            y: 40,
          },
          {
            duration: 0.85,
            ease: "power4.out",
            opacity: 1,
            stagger: 0.1,
            y: 0,
          },
          "+=0.25"
        )
        .fromTo(
          ".footer__offer-decoration-line",
          {
            width: 0,
          },
          {
            duration: 0.45,
            ease: "power4.out",
            width: getElementWidth(".footer__offer-decoration-line"),
          },
          "-=0.25"
        )
        .fromTo(
          ".footer__offer-decoration-arrow",
          {
            x: _calcDecorationArrowXPosition(),
          },
          {
            duration: 0.85,
            ease: "power4.out",
            x: 0,
          },
          ">"
        )
    },
    { scope: refFooter }
  )

  /* prettier-ignore */
  useGSAP((_, contextSafe) => {
    const onMouseMove =
         contextSafe
      && contextSafe((event: MouseEvent) => {
        const elt = event.currentTarget as HTMLElement
        const bounding = elt.getBoundingClientRect() as DOMRect

        gsap.to(elt, {
          x: ((event.clientX - bounding.left) / elt.offsetWidth - 0.5) * 50,
          y: ((event.clientY - bounding.top) / elt.offsetHeight - 0.5) * 50,
          ease: "power4.out",
        })
      })

    const onMouseOut =
         contextSafe
      && contextSafe((event: MouseEvent) => {
        const elt = event.currentTarget as HTMLElement

        gsap.to(elt, {
          x: 0,
          y: 0,
          ease: "power4.out",
        })
      })

    if (
         refLetsStartProjectBtn.current
      && onMouseMove
      && onMouseOut
    ) {
      refLetsStartProjectBtn.current.addEventListener("mousemove", onMouseMove);
      refLetsStartProjectBtn.current.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      if (
         refLetsStartProjectBtn.current
      && onMouseMove
      && onMouseOut
      ) {
        refLetsStartProjectBtn.current.removeEventListener("mousemove", onMouseMove);
        refLetsStartProjectBtn.current.removeEventListener("mouseout", onMouseOut);
      }}
    },
    { scope: refFooter }
  )

  return (
    <footer className={"footer"} ref={refFooter}>
      <div className={"footer__container"}>
        <div className={"footer__content"}>
          <div className={"footer__offer"}>
            <div className={"footer__offer-word"}>
              <p>Let&apos;s make</p>
            </div>
            <div className={"footer__offer-word"}>
              <p>something</p>
            </div>
            <div className={"footer__offer-word"}>
              <p>greate</p>
              <div className={"footer__offer-decoration-line"}></div>
            </div>
            <div className={"footer__offer-word"}>
              <SvgIcon className={"footer__offer-decoration-arrow"} name={"arrow-decoration-rd"} />
              <p>together</p>
            </div>
          </div>
          <div className={"footer__lets-start-wrapper"}>
            <a className={"footer__lets-start-email"} href={"mailto:hey@backendery.dev"}>
              hey@backendery.dev
            </a>
            <button
              className={"footer__lets-start-project-btn"}
              onClick={() => {
                setLetsStartedFormVisibility(true)
              }}
              ref={refLetsStartProjectBtn}
            >
              Start a project
            </button>
          </div>
          <div className={"footer__additional-info"}>
            <p className={"footer__additional-info-copyright"}>
              ©{new Date().getFullYear()}, Backendery. All rights reserved.
            </p>
            <div className={"footer__additional-info-social"}>
              <div className={"footer__social-link"}>
                <a href={"#"}>Telegram</a>
                <SvgIcon name={"arrow-href-trd"} />
              </div>
              <div className={"footer__social-link"}>
                <a href={"#"}>LinkedIn</a>
                <SvgIcon name={"arrow-href-trd"} />
              </div>
              <div className={"footer__social-link"}>
                <a href={"#"}>Facebook</a>
                <SvgIcon name={"arrow-href-trd"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
