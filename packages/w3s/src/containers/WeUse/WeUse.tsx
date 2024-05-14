import React, { FC } from "react"

import TileWeUse, { ITileWeUseProps } from "../../components/Tiles/TileWeUse/TileWeUse"

import "./WeUse.scss"

const tileWeUseData: ITileWeUseProps[] = [
  {
    title: "Language",
    description:
      "As a digital designer and art director I help companies and organisations around the world connect with their audience and grow their business",
    iconName: ["language-python", "language-rust"],
  },
  {
    title: "Framework",
    description:
      "As a digital designer and art director I help companies and organisations around the world connect with their audience and grow their business",
    iconName: ["language-python", "language-rust"],
  },
  {
    title: "Database",
    description:
      "As a digital designer and art director I help companies and organisations around the world connect with their audience and grow their business",
    iconName: ["language-python", "language-rust"],
  },
  {
    title: "Message Queue",
    description:
      "As a digital designer and art director I help companies and organisations around the world connect with their audience and grow their business",
    iconName: ["language-python", "language-rust"],
  },
  {
    title: "Documentation",
    description:
      "As a digital designer and art director I help companies and organisations around the world connect with their audience and grow their business",
    iconName: ["language-python", "language-rust"],
  },
  {
    title: "Containerization",
    description:
      "As a digital designer and art director I help companies and organisations around the world connect with their audience and grow their business",
    iconName: ["language-python", "language-rust"],
  },
  {
    title: "Testing",
    description:
      "As a digital designer and art director I help companies and organisations around the world connect with their audience and grow their business",
    iconName: ["language-python", "language-rust"],
  },
] as const

const WeUse: FC = () => {
  return (
    <React.Fragment>
      <section className={"weuse"}>
        <div className={"weuse__heading"}>
          <h2 className={"weuse__heading__title"}>We use</h2>
          <p className={"weuse__heading__description"}>
            We cover the full range of services for analysis,{" "}
            <span className={"weuse__heading__description--highly-styled"}>
              development and support of your online business
            </span>
          </p>
        </div>
        <div className={"weuse__content"}>
          {tileWeUseData &&
            tileWeUseData.map((data, key) => (
              <TileWeUse title={data.title} description={data.description} iconName={data.iconName} key={key} />
            ))}
        </div>
      </section>
    </React.Fragment>
  )
}

export default WeUse
