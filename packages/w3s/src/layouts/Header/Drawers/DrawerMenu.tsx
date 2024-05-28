import { FC } from "react"

import { SvgIcon } from "../../../components/elements/Icon"
import { useApp } from "../../../contexts/App"

import "./DrawerMenu.scss"

const DrawerMenu: FC = () => {
  const { isDrawerVisible, setDrawerVisibility, setLetsStartedFormVisibility } = useApp()

  return (
    <div className={`drawer-menu ${isDrawerVisible ? "_visible" : ""}`}>
      <button className={"drawer-menu__close-btn"} onClick={() => setDrawerVisibility(false)}>
        <SvgIcon name={"drawer-close"} />
      </button>
      <nav className={"drawer-menu__nav"}>
        <button className={"drawer-menu__link"} onClick={() => setDrawerVisibility(false)}>
          We do!
        </button>
        <button className={"drawer-menu__link"} onClick={() => setDrawerVisibility(false)}>
          Cases
        </button>
        <button className={"drawer-menu__link"} onClick={() => setDrawerVisibility(false)}>
          Steps
        </button>
        <button className={"drawer-menu__link"} onClick={() => setDrawerVisibility(false)}>
          About
        </button>
        <button className={"drawer-menu__link"} onClick={() => setDrawerVisibility(false)}>
          Contacts
        </button>
      </nav>
      <button
        className={"drawer-menu__start-project-btn"}
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
