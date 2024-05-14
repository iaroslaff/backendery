import React, { FC } from "react"

import { SvgIcon } from "../../../components/elements/Icon"
import { useApp } from "../../../contexts/App"

import "./TouchableMenu.scss"

const TouchableMenu: FC = () => {
  const { isDrawerVisible, setDrawerVisibility, setLetsStartedFormVisibility } = useApp()

  return (
    <React.Fragment>
      <div className={`touchable-menu ${isDrawerVisible ? "visible" : ""}`}>
        <button className={"touchable-menu__close-btn"} onClick={() => setDrawerVisibility(false)}>
          <SvgIcon name={"touchable-menu-close"} />
        </button>
        <nav className={"touchable-menu__nav"}>
          <a className={"touchable-menu__nav__link"} onClick={() => setDrawerVisibility(false)}>
            We do!
          </a>
          <a className={"touchable-menu__nav__link"} onClick={() => setDrawerVisibility(false)}>
            Cases
          </a>
          <a className={"touchable-menu__nav__link"} onClick={() => setDrawerVisibility(false)}>
            Steps
          </a>
          <a className={"touchable-menu__nav__link"} onClick={() => setDrawerVisibility(false)}>
            About
          </a>
          <a className={"touchable-menu__nav__link"} onClick={() => setDrawerVisibility(false)}>
            Contacts
          </a>
        </nav>
        <button
          className={"touchable-menu__start-project-btn"}
          onClick={() => {
            setDrawerVisibility(false)
            setLetsStartedFormVisibility(true)
          }}
        >
          Start
          <br />a project
        </button>
        <div className={"touchable-menu__social-links"}>
          <div className={"touchable-menu__social-links__item"}>
            <a className={"touchable-menu__social-links__item--link"} href={"#"}>
              Telegram
            </a>
            <SvgIcon name={"arrow-href-dark"} />
          </div>
          <div className={"touchable-menu__social-links__item"}>
            <a className={"touchable-menu__social-links__item--link"} href={"#"}>
              LinkedIn
            </a>
            <SvgIcon name={"arrow-href-dark"} />
          </div>
          <div className={"touchable-menu__social-links__item"}>
            <a className={"touchable-menu__social-links__item--link"} href={"#"}>
              Facebook
            </a>
            <SvgIcon name={"arrow-href-dark"} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TouchableMenu
