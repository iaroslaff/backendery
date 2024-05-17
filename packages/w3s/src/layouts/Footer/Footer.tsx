import React, { FC } from "react"

import { SvgIcon } from "./../../components/elements/Icon"
import "./Footer.scss"

const Footer: FC = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__body'>
          <div className='footer__title'>
            Let’s make something create <span></span> <br />
            <SvgIcon name={"arrow-offer-dark"} /> together
          </div>
          <div className='footer__contacts'>
            <a href='#' className='footer__contacts-mail'>
              ask@mail.io
            </a>
            <button className='footer__contacts-start-project-btn'>
              <span>Start a project</span>
            </button>
          </div>
        </div>
        <div className='footer__bottom bottom-footer'>
          <div className='bottom-footer__policy'>©2024, Backendery</div>
          <ul className='bottom-footer__footer-links'>
            <li className='bottom-footer__footer-link'>
              <a href='#'>Telegram</a>
            </li>
            <li className='bottom-footer__footer-link'>
              <a href='#'>Linkedin</a>
            </li>
            <li className='bottom-footer__footer-link'>
              <a href='#'>Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
