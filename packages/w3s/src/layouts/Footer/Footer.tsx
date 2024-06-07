import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FC, useRef } from "react"

import { SvgIcon } from "../../components/elements/Icon"
import { useApp } from "../../contexts/App"

import "./Footer.scss"

const Footer: FC = () => {
  const { setLetsStartedFormVisibility } = useApp()

  const tagFooterRef = useRef<HTMLElement>(null)
  const tagLetsStartProjectBtnRef = useRef<HTMLButtonElement>(null)

  /* prettier-ignore */
  function getDecorationLineWidth(): number {
    const width: number = parseInt(window
      .getComputedStyle(document.querySelector(".footer__offer-decoration-line") as Element)
      .getPropertyValue("width")
    )

    return width;
  }

  /* prettier-ignore */
  function computeDecorationArrowXPosition(): number {
    const x: number = (
      parseInt(window
        .getComputedStyle(document.querySelector(".footer__container") as Element)
        .getPropertyValue("width")
      ) -
      parseInt(window
        .getComputedStyle(document.querySelector(".footer__offer") as Element)
        .getPropertyValue("width")
      )
    ) / 2;

    const position: number = (
      parseInt(window
        .getComputedStyle(document.querySelector(".footer__offer-decoration-arrow") as Element)
        .getPropertyValue("width")
      ) + x) * -1;
    
    return position;
  }

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const scrollTrigger = ScrollTrigger.create({
        trigger: tagFooterRef.current,
        start: "top 60%",
      })

      const tl = gsap.timeline({ scrollTrigger: scrollTrigger })
      tl.fromTo(
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
            width: getDecorationLineWidth(),
          },
          "-=0.25"
        )
        .fromTo(
          ".footer__offer-decoration-arrow",
          {
            x: computeDecorationArrowXPosition(),
          },
          {
            duration: 0.85,
            ease: "back.out",
            x: 0,
          },
          ">"
        )
    },
    { scope: tagFooterRef }
  )

  useGSAP(
    (_, contextSafe) => {
      const onMouseMove =
        contextSafe &&
        contextSafe((event: MouseEvent) => {
          const elt = event.currentTarget as HTMLElement
          const bounding = elt.getBoundingClientRect() as DOMRect

          gsap.to(elt, {
            x: ((event.clientX - bounding.left) / elt.offsetWidth - 0.5) * 50,
            y: ((event.clientY - bounding.top) / elt.offsetHeight - 0.5) * 50,
            ease: "power4.out",
          })
        })

      const onMouseOut =
        contextSafe &&
        contextSafe((event: MouseEvent) => {
          const elt = event.currentTarget as HTMLElement

          gsap.to(elt, {
            x: 0,
            y: 0,
            ease: "power4.out",
          })
        })

      // prettier-ignore
      if (
         tagLetsStartProjectBtnRef.current
      && onMouseMove
      && onMouseOut
    ) {
      tagLetsStartProjectBtnRef.current.addEventListener("mousemove", onMouseMove);
      tagLetsStartProjectBtnRef.current.addEventListener("mouseout", onMouseOut);
    }

      return () => {
        // prettier-ignore
        if (
           tagLetsStartProjectBtnRef.current
        && onMouseMove
        && onMouseOut
      ) {
        tagLetsStartProjectBtnRef.current.removeEventListener("mousemove", onMouseMove);
        tagLetsStartProjectBtnRef.current.removeEventListener("mouseout", onMouseOut);
      }
      }
    },
    { scope: tagFooterRef }
  )

  return (
    <footer className={"footer"} ref={tagFooterRef}>
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
              ref={tagLetsStartProjectBtnRef}
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
