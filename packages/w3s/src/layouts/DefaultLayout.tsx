import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Footer from './Footer/Footer'
import Header from './Header/Header'

import './DefaultLayout.scss'

const DefaultLayout: FC = () => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default DefaultLayout
