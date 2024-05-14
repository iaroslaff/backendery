import React, { FC } from "react"

import { SvgIcon } from "../../components/elements/Icon"

import "./Hero.scss"

const Hero: FC = () => {
  return (
    <React.Fragment>
      <section className={"hero"}>
        <div className={"hero__offer"}>
          <div className={"hero__offer__description-wrapper"}>
            <a className={"hero__offer__description-wrapper__btn-call-to-action"} href={"#"}>
              Start
              <br />a project
            </a>
            <p className={"hero__offer__description-wrapper__description"}>
              Sed vestibulum tincidunt tellus, ut pulvinar sapien
            </p>
          </div>
          <h1 className={"hero__offer__title"}>
            <p className={"hero__offer__title__word"}>
              Fastlw<span className={"hero__offer__title__word-decoration-dot"}>.</span>
            </p>
            <p className={"hero__offer__title__word"}>
              Robust<span className={"hero__offer__title__word-decoration-dot"}>.</span>
            </p>
            <p className={"hero__offer__title__word"}>
              Flexible<span className={"hero__offer__title__word-decoration-dot"}>.</span>
            </p>
          </h1>
        </div>
        <div className={"hero_elements"}>
          <div className={"hero_code-container"}>
            <div className={"code-container_decorate-line"}></div>
            <p className={"hero_code"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec elit augue. Aenean pharetra lectus
              elementum felis vestibulum, at fringilla mi dictum. Etiam eget tellus ac sapien dignissim tincidunt quis
              eget augue. Aenean semper felis mi. Pellentesque vel auctor magna. Ut non tortor ut quam vulputate
            </p>
          </div>
          <div className={"hero_code-container hero_code-container-2"}>
            <div className={"code-container_decorate-line"}></div>
            <p className={"hero_code"}>
              ugue. Aenean pharetra lectu mi dictum. Etiam eget tellus ac sapien dignissim tincidunt quis eget augue.
              Aenean semper felis mi. Pellentesque vel auctor magna. Ut non tortor ut quam vulputate
            </p>
          </div>
          <div className={"hero_elements_watch-down-container"}>
            <span>Let&apos;s watch</span>
            <div className={"hero_elements_watch-down-circle"}>
              <SvgIcon name={"arrow-watch-white"} />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Hero
