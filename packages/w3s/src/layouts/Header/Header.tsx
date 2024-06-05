import { useLenis } from "@studio-freight/react-lenis"
import React, { FC } from "react"
import { useMediaQuery } from "react-responsive"

import { SvgIcon } from "../../components/elements/Icon"
import { useApp } from "../../contexts/App"
import { useBreakpoints } from "../../hooks/useBreakpoints"
import DrawerMenu from "./Drawers/DrawerMenu"

import "./Header.scss"

const Header: FC = () => {
  const { setDrawerVisibility } = useApp()

  const { sizes } = useBreakpoints()
  const isLG = useMediaQuery({ minWidth: sizes.LG })

  const lenis = useLenis()

  function getSrollingOffsetForSection(idOrClass: string) {
    return (
      parseInt(window.getComputedStyle(document.querySelector(idOrClass) as Element).getPropertyValue("padding-top")) /
      2
    )
  }

  return (
    <header className={"header"}>
      <div className={"header__container"}>
        <a href={"/"}>
          <SvgIcon name={"logo"} />
        </a>
        {
          //prettier-ignore
          isLG
          ? (
            <div className={"header__nav"}>
              <a
                href={"#"}
                className={"header__nav-link _underscore"}
                onClick={(event) => {
                  event.preventDefault();
                  lenis?.scrollTo(
                    ".we-do__section", { lerp: 0.075, offset: getSrollingOffsetForSection(".we-do__section") }
                  )
                }}
              >We do!</a>
              <a
                href={"#"}
                className={"header__nav-link _underscore"}
                onClick={(event) => {
                  event.preventDefault();
                  lenis?.scrollTo(
                    ".we-use__section", { lerp: 0.075, offset: getSrollingOffsetForSection(".we-use__section") }
                  )
                }}
              >We use</a>
              <a className={"header__nav-link _underscore"} href={"#"}>Steps</a>
              <a className={"header__nav-link _underscore"} href={"#"}>About Us</a>
              <a className={"header__nav-link _underscore"} href={"#"}>Contacts</a>
            </div>
          )
          : (
            <React.Fragment>
              <SvgIcon
                className={"header__drawer-menu"}
                name={"drawer-open"}
                onClick={() => setDrawerVisibility(true)}
              />
              <DrawerMenu />
            </React.Fragment>
          )
        }
      </div>
    </header>
  )
}

export default Header
