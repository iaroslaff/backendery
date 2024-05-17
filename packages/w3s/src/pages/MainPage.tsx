import React, { FC } from "react"

import AboutUs from "../containers/AboutUs/AboutUs"
import Cases from "../containers/Cases/Cases"
import Hero from "../containers/Hero/Hero"
import Steps from "../containers/Steps/Steps"
import WeDo from "../containers/WeDo/WeDo"
import WeUse from "../containers/WeUse/WeUse"
import LetsStartedForm from "../containers/forms/LetsStartedForm/LetsStartedForm"

import { useApp } from "../contexts/App"

const MainPage: FC = () => {
  const { isLetsStartedFormVisible } = useApp()

  return (
    <React.Fragment>
      <Hero />
      <WeDo />
      <WeUse />
      <Cases />
      <Steps />
      <AboutUs />
      {isLetsStartedFormVisible && <LetsStartedForm />}
    </React.Fragment>
  )
}

export default MainPage
