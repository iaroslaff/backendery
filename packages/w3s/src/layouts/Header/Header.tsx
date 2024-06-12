import { useGSAP } from "@gsap/react"
import { useLenis } from "@studio-freight/react-lenis"
import gsap from "gsap"
import React, { FC, useRef } from "react"

import { SvgIcon } from "../../components/elements/Icon"
import { useApp } from "../../contexts/App"
import { useBreakpoints } from "../../hooks/useBreakpoints"
import DrawerMenu from "./Drawers/DrawerMenu"
import { calcScrollingOffset } from "./utils"

import "./Header.scss"

const Header: FC = () => {
  /** hooks */
  const { setDrawerVisibility } = useApp()
  const { isSmallLaptop, isLaptop, isPC } = useBreakpoints()
  const lenis = useLenis()

  /** refs */
  const refOpenDrawerMenuBtn = useRef<HTMLButtonElement>(null)

  function openDrawerMenu(): void {
    gsap
      .timeline({
        onStart: () => {
          setDrawerVisibility(true)
        },
      })
      .fromTo(
        ".drawer-menu__close-btn",
        {
          opacity: 0,
          y: -30,
        },
        {
          ease: "power4.out",
          opacity: 1,
          y: 0,
        },
        "+=0.6"
      )
      .fromTo(
        ".drawer-menu__link",
        {
          opacity: 0,
          x: 80,
        },
        {
          ease: "power4.out",
          opacity: 1,
          stagger: 0.05,
          x: 0,
        },
        "<0.15"
      )
      .fromTo(
        ".drawer-menu__lets-start-project-btn",
        {
          opacity: 0,
        },
        {
          duration: 0.25,
          ease: "power1",
          opacity: 1,
        },
        "<0.15"
      )
      .fromTo(
        ".drawer-menu__social-link",
        {
          opacity: 0,
          y: 20,
        },
        {
          ease: "power4.out",
          opacity: 1,
          stagger: 0.05,
          y: 0,
        },
        "<0.15"
      )
  }

  /* prettier-ignore */
  useGSAP((_, contextSafe) => {
    const onMouseClickAtOpenDrawerMenu =
         contextSafe
      && contextSafe(() => { openDrawerMenu() })

         onMouseClickAtOpenDrawerMenu
      && refOpenDrawerMenuBtn.current
      && refOpenDrawerMenuBtn.current.addEventListener(
        "click",
        onMouseClickAtOpenDrawerMenu
      )

    return () => {
         onMouseClickAtOpenDrawerMenu
      && refOpenDrawerMenuBtn.current
      && refOpenDrawerMenuBtn.current.removeEventListener(
        "click",
        onMouseClickAtOpenDrawerMenu
      )
    }
  })

  return (
    <header className={"header"}>
      <div className={"header__container"}>
        <a href={"/"}>
          <SvgIcon name={"logo"} />
        </a>
        {
          /* prettier-ignore */
          isSmallLaptop || isLaptop || isPC
          ? (
            <div className={"header__nav"}>
              <a
                href={"#"}
                className={"header__nav-link _underscore"}
                onClick={(event) => {
                     event
                  && event.preventDefault();
                     lenis
                  && lenis.scrollTo(
                    ".we-do__section",
                    {
                      lerp: 0.075,
                      offset: calcScrollingOffset(".we-do__section")
                    }
                  )
                }}
              >We do!</a>
              <a
                href={"#"}
                className={"header__nav-link _underscore"}
                onClick={(event) => {
                     event
                  && event.preventDefault();
                     lenis
                  && lenis.scrollTo(
                    ".we-use__section",
                    {
                      lerp: 0.075,
                      offset: calcScrollingOffset(".we-use__section")
                    }
                  )
                }}
              >We use</a>
              <a
                href={"#"}
                className={"header__nav-link _underscore"}
                onClick={(event) => {
                     event
                  && event.preventDefault();
                     lenis
                  && lenis.scrollTo(
                    ".cases__section",
                    {
                      lerp: 0.075,
                      offset: calcScrollingOffset(".cases__section")
                    }
                  )
                }}
              >Cases</a>
              <a
                href={"#"}
                className={"header__nav-link _underscore"}
                onClick={(event) => {
                     event
                  && event.preventDefault();
                     lenis
                  && lenis.scrollTo(
                    ".steps__section",
                    {
                      lerp: 0.075,
                      offset: calcScrollingOffset(".steps__section")
                    }
                  )
                }}
              >Steps</a>
              <a
                href={"#"}
                className={"header__nav-link _underscore"}
                onClick={(event) => {
                     event
                  && event.preventDefault();
                     lenis
                  && lenis.scrollTo(
                    ".about-us__section",
                    {
                      lerp: 0.075,
                      offset: calcScrollingOffset(".about-us__section")
                    }
                  )
                }}
              >About us</a>
              <a
                href={"#"}
                className={"header__nav-link _underscore"}
                onClick={(event) => {
                     event
                  && event.preventDefault();
                     lenis
                  && lenis.scrollTo(
                    ".footer",
                    {
                      lerp: 0.075,
                      offset: calcScrollingOffset(".footer")
                    }
                  )
                }}
              >Contacts</a>
            </div>
          )
          : (
            <React.Fragment>
              <button className={"header__drawer-menu"} ref={refOpenDrawerMenuBtn}>
                <SvgIcon name={"drawer-open"} />
              </button>
              <DrawerMenu />
            </React.Fragment>
          )
        }
      </div>
    </header>
  )
}

export default Header
