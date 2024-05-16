import { FC } from "react"

import { SvgIcon } from "../../components/elements/Icon"

import "./WeDo.scss"

const WeDo: FC = () => {
  return (
    <section className={"we-do__section"}>
      <h2 className={"we-do__title"}>
        What
        <br />
        we do
      </h2>
      <div className={"we-do__card"}>
        <div className={"we-do__card-heading-decoration"}>
          <SvgIcon name={"server-applications"} />
        </div>
        <h4 className={"we-do__card-title"}>Server Applications</h4>
        <p className={"we-do__card-description"}>
          Sed vestibulum tincidunt tellus, ut pulvinar sapien venenatis vitae. Maecenas sodale
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-heading-decoration"}>
          <SvgIcon name={"api"} />
        </div>
        <h4 className={"we-do__card-title"}>API&apos;s</h4>
        <p className={"we-do__card-description"}>
          Sed vestibulum tincidunt tellus, ut pulvinar sapien venenatis vitae. Maecenas sodale
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-heading-decoration"}>
          <SvgIcon name={"services-integration"} />
        </div>
        <h4 className={"we-do__card-title"}>Service Integrations</h4>
        <p className={"we-do__card-description"}>
          Sed vestibulum tincidunt tellus, ut pulvinar sapien venenatis vitae. Maecenas sodale
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-heading-decoration"}>
          <SvgIcon name={"automation-tools"} />
        </div>
        <h4 className={"we-do__card-title"}>Automation Tools</h4>
        <p className={"we-do__card-description"}>
          Sed vestibulum tincidunt tellus, ut pulvinar sapien venenatis vitae. Maecenas sodale
        </p>
      </div>

      <div className={"we-do__card"}>
        <div className={"we-do__card-heading-decoration we-do__card-heading-decoration--text"}>
          <p>For</p>
          <span className={"we-do__card-tag"}>messengers</span>
          <span className={"we-do__card-tag"}>chats</span>
          <span className={"we-do__card-tag"}>news</span>
          <p>and others</p>
        </div>
        <h4 className={"we-do__card-title"}>Bots</h4>
        <p className={"we-do__card-description"}>
          Sed vestibulum tincidunt tellus, ut pulvinar sapien venenatis vitae. Maecenas sodale
        </p>
      </div>
    </section>
  )
}

export default WeDo
