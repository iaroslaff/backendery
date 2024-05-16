import { FC } from "react"

import { SvgIcon } from "../../components/elements/Icon"

import "./WeUse.scss"

const WeUse: FC = () => {
  return (
    <section className={"we-use__section"}>
      <div className={"we-use__heading"}>
        <h2 className={"we-use__heading-title"}>We use</h2>
        <p className={"we-use__heading-description"}>
          We cover the full range of services for analysis, <span>development and support of your online business</span>
        </p>
      </div>
      <div className={"we-use__content"}>
        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Language</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <p className={"we-use__card-tools-title"}>Tools</p>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Framework</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <p className={"we-use__card-tools-title"}>Tools</p>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Database</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <p className={"we-use__card-tools-title"}>Tools</p>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Message Queue</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <p className={"we-use__card-tools-title"}>Tools</p>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Testing</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <p className={"we-use__card-tools-title"}>Tools</p>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Documentation</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <p className={"we-use__card-tools-title"}>Tools</p>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-rust"} />
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Containerization</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <p className={"we-use__card-tools-title"}>Tools</p>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-python"} />
            </div>
            <div className={"we-use__card-tools-particular"}>
              <SvgIcon name={"language-rust"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeUse
