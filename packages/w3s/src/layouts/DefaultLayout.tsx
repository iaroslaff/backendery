import React, { FC } from "react"
import { Outlet } from "react-router-dom"

import Footer from "./Footer/Footer"
import Header from "./Header/Header"

import "./DefaultLayout.scss"

const DefaultLayout: FC = () => {
  return (
    <div data-scroll-container>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default DefaultLayout
