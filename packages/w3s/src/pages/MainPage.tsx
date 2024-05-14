import React, { FC } from "react"

import Hero from "../containers/Hero/Hero"
import LetsStartedForm from "../containers/LetsStartedForm/LetsStartedForm"
import WeDo from "../containers/WeDo/WeDo"
import WeUse from "../containers/WeUse/WeUse"

import { useApp } from "../contexts/App"

const MainPage: FC = () => {
  const { isLetsStartedFormVisible } = useApp()

  return (
    <React.Fragment>
      <Hero />
      <WeDo />
      <WeUse />
      {isLetsStartedFormVisible && <LetsStartedForm />}
    </React.Fragment>
  )
}

export default MainPage
