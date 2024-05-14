import React, { FC } from "react"

import { IconName, SvgIcon } from "../../elements/Icon"

import "./TileWeUse.scss"

export interface ITileWeUseProps {
  title: string
  description: string
  iconName: IconName[]
  key?: number
}

const TileWeUse: FC<ITileWeUseProps> = props => {
  return (
    <React.Fragment>
      <div className={"we-use"}>
        <h3 className={"we-use__title"}>{props.title}</h3>
        <p className={"we-use__description"}>{props.description}</p>
        <div className={"we-use__tools"}>
          <p className={"we-use__tools__title"}>Tools</p>
          {props.iconName &&
            props.iconName.map((iconName, key) => (
              <div key={key} className={"we-use__tools__particular-tool"}>
                <SvgIcon name={iconName} />
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default TileWeUse
