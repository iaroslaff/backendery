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
              <a className={"header__nav-link _underscore"} href={"#"}>We do!</a>
              <a className={"header__nav-link _underscore"} href={"#"}>Cases</a>
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
