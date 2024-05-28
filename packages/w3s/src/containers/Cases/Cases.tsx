import { FC } from "react"

import { SvgIcon } from "../../components/elements/Icon"

import {
  default as noImage1,
  default as noImage2,
  default as noImage3,
  default as noImage4,
} from "../../assets/images/no-image-placeholder.png"

import "./Cases.scss"

const Cases: FC = () => {
  return (
    <section className={"cases__section"}>
      <div className={"cases__heading"}>
        <div className={"cases__note"}>
          <SvgIcon name={"decoration-asterisk"} />
          <span>
            Some latest
            <br />
            our works
          </span>
        </div>
        <h2 className={"cases__title"}>Cases</h2>
      </div>
      <div className={"cases__grid"}>
        <article className={"card-case _dark-theme"}>
          <div className={"card-case__content"}>
            <h3 className={"card-case__title"}>Parquet converter</h3>
            <p className={"card-case__description"}>
              Database and sales management system for an online store of metal product
            </p>
            <div className={"card-case__tools"}>
              <div className={"card-case__tools-heading"}>Used tools</div>
              <div className={"card-case__tools-items"}>
                <div className={"card-case__tools-item"}>
                  <SvgIcon name={"we-use-language-python"} />
                </div>
                <div className={"card-case__tools-item"}>
                  <SvgIcon name={"we-use-language-rust"} />
                </div>
                <div className={"card-case__tools-item"}>
                  <SvgIcon name={"we-use-language-python"} />
                </div>
              </div>
            </div>
          </div>
          <div className={"card-case__image"}>
            <img src={noImage1} />
          </div>
        </article>
        <article className={"card-case _light-theme"}>
          <div className={"card-case__content"}>
            <h3 className={"card-case__title"}>Trading system</h3>
            <p className={"card-case__description"}>
              As a digital designer and art director I help companies and organisations around the world connect with
              their audience and grow their
            </p>
            <div className={"card-case__tools"}>
              <div className={"card-case__tools-heading"}>Used tools</div>
              <div className={"card-case__tools-items"}>
                <div className={"card-case__tools-item card-case__tools-item--invert-color"}>
                  <SvgIcon name={"we-use-language-python"} />
                </div>
                <div className={"card-case__tools-item card-case__tools-item--invert-color"}>
                  <SvgIcon name={"we-use-language-rust"} />
                </div>
              </div>
            </div>
          </div>
          <div className={"card-case__image"}>
            <img src={noImage2} />
          </div>
        </article>
        <article className={"card-case _light-theme"}>
          <div className={"card-case__content"}>
            <h3 className={"card-case__title"}>File controller</h3>
            <p className={"card-case__description"}>
              As a digital designer and art director I help companies and organisations around the world connect with
              their audience and grow their
            </p>
            <div className={"card-case__tools"}>
              <div className={"card-case__tools-heading"}>Used tools</div>
              <div className={"card-case__tools-items"}>
                <div className={"card-case__tools-item card-case__tools-item--invert-color"}>
                  <SvgIcon name={"we-use-language-python"} />
                </div>
                <div className={"card-case__tools-item card-case__tools-item--invert-color"}>
                  <SvgIcon name={"we-use-language-rust"} />
                </div>
                <div className={"card-case__tools-item card-case__tools-item--invert-color"}>
                  <SvgIcon name={"we-use-language-python"} />
                </div>
                <div className={"card-case__tools-item card-case__tools-item--invert-color"}>
                  <SvgIcon name={"we-use-language-rust"} />
                </div>
              </div>
            </div>
          </div>
          <div className={"card-case__image"}>
            <img src={noImage3} />
          </div>
        </article>
        <article className={"card-case _dark-theme"}>
          <div className={"card-case__content"}>
            <h3 className={"card-case__title"}>Msg</h3>
            <p className={"card-case__description"}>
              As a digital designer and art director I help companies and organisations around the world connect with
              their audience and grow their
            </p>
            <div className={"card-case__tools"}>
              <div className={"card-case__tools-heading"}>Used tools</div>
              <div className={"card-case__tools-items"}>
                <div className={"card-case__tools-item"}>
                  <SvgIcon name={"we-use-language-python"} />
                </div>
                <div className={"card-case__tools-item"}>
                  <SvgIcon name={"we-use-language-rust"} />
                </div>
                <div className={"card-case__tools-item"}>
                  <SvgIcon name={"we-use-language-python"} />
                </div>
                <div className={"card-case__tools-item"}>
                  <SvgIcon name={"we-use-language-rust"} />
                </div>
                <div className={"card-case__tools-item"}>
                  <SvgIcon name={"we-use-language-python"} />
                </div>
              </div>
            </div>
          </div>
          <div className={"card-case__image"}>
            <img src={noImage4} />
          </div>
        </article>
      </div>
    </section>
  )
}

export default Cases
