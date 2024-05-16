import { FC } from "react"

import { SvgIcon } from "../../../components/elements/Icon"
import { useApp } from "../../../contexts/App"

import "./TouchableMenu.scss"

const TouchableMenu: FC = () => {
  const { isDrawerVisible, setDrawerVisibility, setLetsStartedFormVisibility } = useApp()

  return (
    <div className={`touchable-menu ${isDrawerVisible ? "_visible" : ""}`}>
      <button className={"touchable-menu__close-btn"} onClick={() => setDrawerVisibility(false)}>
        <SvgIcon name={"touchable-menu-close"} />
      </button>
      <nav className={"touchable-menu__nav"}>
        <button className={"touchable-menu__link"} onClick={() => setDrawerVisibility(false)}>
          We do!
        </button>
        <button className={"touchable-menu__link"} onClick={() => setDrawerVisibility(false)}>
          Cases
        </button>
        <button className={"touchable-menu__link"} onClick={() => setDrawerVisibility(false)}>
          Steps
        </button>
        <button className={"touchable-menu__link"} onClick={() => setDrawerVisibility(false)}>
          About
        </button>
        <button className={"touchable-menu__link"} onClick={() => setDrawerVisibility(false)}>
          Contacts
        </button>
      </nav>
      <button
        className={"touchable-menu__start-project-btn"}
        onClick={() => {
          setDrawerVisibility(false)
          setLetsStartedFormVisibility(true)
        }}
      >
        <span>
          Start
          <br />a project
        </span>
      </button>
      <div className={"touchable-menu__social-links"}>
        <div className={"touchable-menu__social-link"}>
          <a href={"#"}>Telegram</a>
          <SvgIcon name={"arrow-href-dark"} />
        </div>
        <div className={"touchable-menu__social-link"}>
          <a href={"#"}>LinkedIn</a>
          <SvgIcon name={"arrow-href-dark"} />
        </div>
        <div className={"touchable-menu__social-link"}>
          <a href={"#"}>Facebook</a>
          <SvgIcon name={"arrow-href-dark"} />
        </div>
      </div>
    </div>
  )
}

export default TouchableMenu
