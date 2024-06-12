import { useGSAP } from "@gsap/react"
import { useLenis } from "@studio-freight/react-lenis"
import gsap from "gsap"
import { FC, useRef } from "react"

import { SvgIcon } from "../../../components/elements/Icon"
import { useApp } from "../../../contexts/App"
import { useScrollLock } from "../../../hooks/useScrollLock"
import calcScrollingOffset from "../utils"

import "./DrawerMenu.scss"

const DrawerMenu: FC = () => {
  /** hooks */
  const { isDrawerVisible, setDrawerVisibility, setLetsStartedFormVisibility } = useApp()
  const lenis = useLenis()

  /** refs */
  /* prettier-ignore */
  const refCloseDrawerMenuBtn  = useRef<HTMLButtonElement>(null)
  const refLetsStartProjectBtn = useRef<HTMLButtonElement>(null)

  function closeDrawerMenu(): void {
    gsap
      .timeline({
        onComplete: () => {
          setDrawerVisibility(false)
        },
      })
      .fromTo(
        ".drawer-menu__close-btn",
        {
          opacity: 1,
          y: 0,
        },
        {
          ease: "power4.out",
          opacity: 0,
          y: -30,
        }
      )
      .fromTo(
        ".drawer-menu__link",
        {
          opacity: 1,
          x: 0,
        },
        {
          ease: "power4.out",
          opacity: 0,
          stagger: 0.05,
          x: 80,
        },
        "<0.15"
      )
      .fromTo(
        ".drawer-menu__lets-start-project-btn",
        {
          opacity: 1,
        },
        {
          duration: 0.25,
          ease: "power1",
          opacity: 0,
        },
        "<0.15"
      )
      .fromTo(
        ".drawer-menu__social-link",
        {
          opacity: 1,
          y: 0,
        },
        {
          ease: "power4.out",
          opacity: 0,
          stagger: 0.05,
          y: 20,
        },
        "<0.15"
      )
  }

  /* prettier-ignore */
  useGSAP((_, contextSafe) => {
    const onMouseClickAtCloseDrawerMenu  =
         contextSafe
      && contextSafe(() => { closeDrawerMenu() })

    const onMouseClickAtLetsStartProject =
         contextSafe
      && contextSafe(() => {
        closeDrawerMenu()
        setLetsStartedFormVisibility(true)
      })

       onMouseClickAtCloseDrawerMenu
    && refCloseDrawerMenuBtn.current
    && refCloseDrawerMenuBtn.current.addEventListener(
      "click",
      onMouseClickAtCloseDrawerMenu
    );

       onMouseClickAtLetsStartProject
    && refLetsStartProjectBtn.current
    && refLetsStartProjectBtn.current.addEventListener(
      "click",
      onMouseClickAtLetsStartProject
    );

    return () => {
         onMouseClickAtCloseDrawerMenu
      && refCloseDrawerMenuBtn.current
      && refCloseDrawerMenuBtn.current.removeEventListener(
        "click",
        onMouseClickAtCloseDrawerMenu
      );

         onMouseClickAtLetsStartProject
      && refLetsStartProjectBtn.current
      && refLetsStartProjectBtn.current.addEventListener(
        "click",
        onMouseClickAtLetsStartProject
      );
    }
  })

  useScrollLock(isDrawerVisible)

  return (
    <div className={`drawer-menu ${isDrawerVisible ? "_visible" : ""}`} data-lenis-prevent-touch>
      <button className={"drawer-menu__close-btn"} ref={refCloseDrawerMenuBtn}>
        <SvgIcon name={"drawer-close"} />
      </button>
      <nav className={"drawer-menu__nav"}>
        <button
          className={"drawer-menu__link"}
          onClick={(event) => {
            event && event.preventDefault()
            lenis && lenis.scrollTo(
              ".we-do__section",
              {
                lerp: 0.075,
                offset: calcScrollingOffset(".we-do__section")
              }
            )
            closeDrawerMenu()
          }}
        >We do!</button>
        <button
          className={"drawer-menu__link"}
          onClick={(event) => {
            event && event.preventDefault()
            lenis && lenis.scrollTo(
              ".we-use__section",
              {
                lerp: 0.075,
                offset: calcScrollingOffset(".we-use__section")
              }
            )
            closeDrawerMenu()
          }}
        >We use</button>
        <button
          className={"drawer-menu__link"}
          onClick={(event) => {
            event && event.preventDefault()
            lenis && lenis.scrollTo(
              ".cases__section",
              {
                lerp: 0.075,
                offset: calcScrollingOffset(".cases__section")
              }
            )
            closeDrawerMenu()
          }}
        >Cases</button>
        <button
          className={"drawer-menu__link"}
          onClick={(event) => {
            event && event.preventDefault();
            lenis && lenis.scrollTo(
              ".steps__section",
              {
                lerp: 0.075,
                offset: calcScrollingOffset(".steps__section")
              }
            )
            closeDrawerMenu()
          }}
        >Steps</button>
        <button
          className={"drawer-menu__link"}
          onClick={(event) => {
            event && event.preventDefault();
            lenis && lenis.scrollTo(
              ".about-us__section",
              {
                lerp: 0.075,
                offset: calcScrollingOffset(".about-us__section")
              }
            )
            closeDrawerMenu()
          }}
        >About us</button>
        <button
          className={"drawer-menu__link"}
          onClick={(event) => {
            event && event.preventDefault();
            lenis && lenis.scrollTo(
              ".footer",
              {
                lerp: 0.075,
                offset: calcScrollingOffset(".footer")
              }
            )
            closeDrawerMenu()
          }}
        >Contacts</button>
      </nav>
      <button
        className={"drawer-menu__lets-start-project-btn"}
        onClick={() => {
          closeDrawerMenu()
          setLetsStartedFormVisibility(true)
        }}
      >
        <span>
          Start
          <br />a project
        </span>
      </button>
      <div className={"drawer-menu__social-links"}>
        <div className={"drawer-menu__social-link"}>
          <a href={"#"}>Telegram</a>
          <SvgIcon name={"arrow-href-trd"} />
        </div>
        <div className={"drawer-menu__social-link"}>
          <a href={"#"}>LinkedIn</a>
          <SvgIcon name={"arrow-href-trd"} />
        </div>
        <div className={"drawer-menu__social-link"}>
          <a href={"#"}>Facebook</a>
          <SvgIcon name={"arrow-href-trd"} />
        </div>
      </div>
    </div>
  )
}

export default DrawerMenu
