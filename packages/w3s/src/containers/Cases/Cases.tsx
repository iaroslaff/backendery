import React, { FC } from "react"

import noImage from "./../../assets/images/no-image-placeholder.png"
import CardCase, { ICardCase } from "./../../components/Cards/CardCase/CardCase"
import { SvgIcon } from "./../../components/elements/Icon"
import "./Cases.scss"

export const casesList: ICardCase[] = [
  {
    title: "22vyroby.com",
    description: "Database and sales management system for an online store of metal product",
    tools: ["", "", ""],
    image: noImage,
  },
  {
    title: "Trading system",
    description:
      "As a digital designer and art director I help companies and organisations around the world connect with their audience and grow their ",
    tools: ["", "", ""],
    image: noImage,
  },
  {
    title: "File controller",
    description:
      "A developed system for the American financial structure that allows you to create and control long-term tasks in the form of running processes bat files and track the results of tasks",
    tools: ["", "", "", ""],
    image: noImage,
  },
  {
    title: "MSG",
    description:
      "An event monitoring system developed for a gaming company based on created rules and rule parsing using AST",
    tools: ["", "", "", "", ""],

    image: noImage,
  },
]

const Cases: FC = () => {
  return (
    <section className='cases__section'>
      <div className='cases__heading'>
        <div className='cases__note'>
          <SvgIcon name='decoration-asterisk' />
          <span>Some latest our works</span>
        </div>
        <h2 className='cases__title'>Cases</h2>
      </div>
      <div className='cases__grid'>
        {casesList.map((el, key) => {
          const isEven = key % 3 === 0
          return (
            <CardCase
              key={key}
              description={el.description}
              title={el.title}
              image={el.image}
              tools={el.tools}
              theme={isEven ? "dark" : "light"}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Cases
