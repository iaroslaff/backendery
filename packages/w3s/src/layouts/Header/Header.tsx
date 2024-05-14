import React, { FC } from "react"
import { useMediaQuery } from "react-responsive"

import { SvgIcon } from "../../components/elements/Icon"
import { useApp } from "../../contexts/App"
import { useBreakpoints } from "../../hooks/useBreakpoints"
import TouchableMenu from "./Drawers/TouchableMenu"

import "./Header.scss"

const Header: FC = () => {
  const { setDrawerVisibility } = useApp()
  const { sizes } = useBreakpoints()
  const isLG = useMediaQuery({ minWidth: sizes.LG })

  return (
    <React.Fragment>
      <header className={"header"}>
        <a href={"/"}>
          <SvgIcon name={"logo"} />
        </a>
        {
          //prettier-ignore
          isLG
          ? (
            <React.Fragment>
              <div className={"header__nav"}>
                <a className={"header__nav__link"} href={"#"}>We do!</a>
                <a className={"header__nav__link"} href={"#"}>Cases</a>
                <a className={"header__nav__link"} href={"#"}>Steps</a>
                <a className={"header__nav__link"} href={"#"}>About</a>
                <a className={"header__nav__link"} href={"#"}>Contacts</a>
              </div>
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <SvgIcon
                className={`header__touchable-menu`}
                name={"burger"}
                onClick={() => setDrawerVisibility(true)}
              />
              <TouchableMenu />
            </React.Fragment>
          )
        }
      </header>
    </React.Fragment>
  )
}

export default Header
