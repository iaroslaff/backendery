import React, { FC } from "react"

import { SvgIcon } from "../components/elements/Icon"

const MainPage: FC = () => {
  return (
    <React.Fragment>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          fontSize: "28px",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        Hey from Bearded Dudes!
        <div
          style={{
            height: "164px",
            margin: "10px",
            padding: "10px",
            width: "164px",
          }}
        >
          <SvgIcon name={"react"} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default MainPage
