import React, { FC } from "react"

import CardWeDo, { CardWeDoHeadingDecoration, ICardWeDoProps } from "../../components/Cards/CardWeDo/CardWeDo"

import "./WeDo.scss"

const cardWeDoData: ICardWeDoProps[] = [
  {
    headingDecoration: CardWeDoHeadingDecoration.Icon,
    title: "Server Applications",
    description: "Sed vestibulum tincidunt tellus, ut pulvinar sapien venenatis vitae. Maecenas sodale",
    iconName: "server-applications",
  },
  {
    headingDecoration: CardWeDoHeadingDecoration.Icon,
    title: "Service Integrations",
    description: "Sed vestibulum tincidunt tellus, ut pulvinar sapien venenatis vitae. Maecenas sodale",
    iconName: "services-integration",
  },
  {
    headingDecoration: CardWeDoHeadingDecoration.Icon,
    title: "API",
    description: "Sed vestibulum tincidunt tellus, ut pulvinar sapien venenatis vitae. Maecenas sodale",
    iconName: "api",
  },
  {
    headingDecoration: CardWeDoHeadingDecoration.Icon,
    title: "Automation Tools",
    description: "Sed vestibulum tincidunt tellus, ut pulvinar sapien venenatis vitae. Maecenas sodale",
    iconName: "automation-tools",
  },
  {
    headingDecoration: CardWeDoHeadingDecoration.Text,
    title: "Bots",
    description: "Sed vestibulum tincidunt tellus, ut pulvinar sapien venenatis vitae. Maecenas sodale",
    tags: ["messengers", "chats", "news"],
  },
] as const

const WeDo: FC = () => {
  return (
    <React.Fragment>
      <section className={"wedo"}>
        <h2 className={"wedo__title"}>
          What
          <br />
          we do
        </h2>
        {cardWeDoData &&
          cardWeDoData.map((data, key) => (
            <CardWeDo
              headingDecoration={data.headingDecoration}
              title={data.title}
              description={data.description}
              iconName={data.iconName}
              tags={data.tags}
              key={key}
            />
          ))}
      </section>
    </React.Fragment>
  )
}

export default WeDo
