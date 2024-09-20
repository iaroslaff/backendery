import React, { FC } from "react"
import { Outlet } from "react-router-dom"

import "./DefaultLayout.scss"

const DefaultLayout: FC = () => {
  return (
    <React.Fragment>
      <main className={"main"}>
        <Outlet />
      </main>
    </React.Fragment>
  )
}

export default DefaultLayout
