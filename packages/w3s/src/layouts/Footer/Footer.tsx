import { FC } from "react"

import { SvgIcon } from "../../components/elements/Icon"
import { useApp } from "../../contexts/App"

import "./Footer.scss"

const Footer: FC = () => {
  const { setLetsStartedFormVisibility } = useApp()

  return (
    <footer className={"footer"}>
      <div className={"footer__container"}>
        <div className={"footer__body"}>
          <div className={"footer__title"}>
            Let&apos;s make something create <span></span> <br />
            <SvgIcon name={"arrow-decoration-rd"} /> together
          </div>
          <div className={"footer__contacts"}>
            <a href={"mailto:hey@backendery.dev"} className={"footer__contacts-email"}>
              hey@backendery.dev
            </a>
            <button
              className={"footer__contacts-start-project-btn"}
              onClick={() => {
                setLetsStartedFormVisibility(true)
              }}
            >
              <span>Start a project</span>
            </button>
          </div>
        </div>
        <div className={"footer__bottom bottom-footer"}>
          <div className={"bottom-footer__policy"}>©{new Date().getFullYear()}, Backendery. All rights reserved.</div>
          <ul className={"bottom-footer__footer-links"}>
            <li className={"bottom-footer__footer-link"}>
              <a href={"#"}>Telegram</a>
            </li>
            <li className={"bottom-footer__footer-link"}>
              <a href={"#"}>LinkedIn</a>
            </li>
            <li className={"bottom-footer__footer-link"}>
              <a href={"#"}>Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
