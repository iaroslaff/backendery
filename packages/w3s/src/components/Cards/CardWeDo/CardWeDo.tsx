import React, { FC } from "react"

import { IconName, SvgIcon } from "../../elements/Icon"

import "./CardWeDo.scss"

export enum CardWeDoHeadingDecoration {
  Icon = 0x00_00_00_01,
  Text,
}

export interface ICardWeDoProps {
  headingDecoration: CardWeDoHeadingDecoration
  title: string
  description: string
  iconName?: IconName
  tags?: string[]
  key?: number
}

const CardWeDo: FC<ICardWeDoProps> = ({ headingDecoration = CardWeDoHeadingDecoration.Icon, ...props }) => {
  return (
    <React.Fragment>
      <div className={"card-wedo"}>
        <div
          className={`card-wedo__heading-decoration ${headingDecoration === CardWeDoHeadingDecoration.Text ? "card-wedo__heading-decoration--text" : ""}`}
        >
          {headingDecoration === CardWeDoHeadingDecoration.Icon && props.iconName && <SvgIcon name={props.iconName} />}
          {headingDecoration === CardWeDoHeadingDecoration.Text && props.tags && (
            <React.Fragment>
              <p>For</p>
              {props.tags.map((tag, key) => (
                <span key={key} className={"card-wedo__heading-decoration__tag"}>
                  {tag}
                </span>
              ))}
              <p>and others</p>
            </React.Fragment>
          )}
        </div>
        <h4 className={"card-wedo__title"}>{props.title}</h4>
        <p className={"card-wedo__description"}>{props.description}</p>
      </div>
    </React.Fragment>
  )
}

export default CardWeDo
