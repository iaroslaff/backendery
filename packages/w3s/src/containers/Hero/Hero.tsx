import { FC } from "react"

import { SvgIcon } from "../../components/elements/Icon"
import { useApp } from "../../contexts/App"

import "./Hero.scss"

const Hero: FC = () => {
  const { setLetsStartedFormVisibility } = useApp()

  return (
    <section className={"hero__section"}>
      <div className={"hero__offer"}>
        <div className={"hero__description-wrapper"}>
          <button
            className={"hero__start-project-btn"}
            onClick={() => {
              setLetsStartedFormVisibility(true)
            }}
          >
            Start
            <br />a project
          </button>
          <p className={"hero__description"}>
            These words don&apos;t just describe our approach, they are the foundation of it. We strive to create
            software that not only works seamlessly and adapts to different needs, but is also easy for our users to
            understand and use
          </p>
        </div>
        <div className={"hero__title-wrapper"}>
          <h2 className={"hero__title-word"}>
            Robust<span>.</span>
          </h2>
          <h2 className={"hero__title-word"}>
            Flexible<span>.</span>
          </h2>
          <h2 className={"hero__title-word"}>
            Intuitive<span>.</span>
          </h2>
        </div>
      </div>
      <div className={"hero__code-container"}>
        <div className={"hero__code-wrapper"}>
          <div className={"hero__code hero__code--1"}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec elit augue. Aenean pharetra lectus
              elementum felis vestibulum, at fringilla mi dictum. Etiam eget tellus ac sapien dignissim tincidunt quis
              eget augue. Aenean semper felis mi. Pellentesque vel auctor magna. Ut non tortor
            </p>
          </div>
          <div className={"hero__code hero__code--2"}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec elit augue. Aenean pharetra lectus
              elementum felis vestibulum, at fringilla mi dictum. Etiam eget tellus ac sapien dignissim tincidunt quis
              eget augue. Aenean semper felis mi. Pellentesque vel auctor magna. Ut non tortor
            </p>
          </div>
        </div>
        <div className={"hero__lets-watch"}>
          <span>Let&apos;s watch</span>
          <button className={"hero__lets-watch-circle"}>
            <SvgIcon name={"arrow-watch-white"} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
