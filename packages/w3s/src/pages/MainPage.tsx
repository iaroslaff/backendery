import React, { FC } from "react"

import Cases from "../containers/Cases/Cases"
import Hero from "../containers/Hero/Hero"
import LetsStartedForm from "../containers/LetsStartedForm/LetsStartedForm"
import WeDo from "../containers/WeDo/WeDo"
import WeUse from "../containers/WeUse/WeUse"
import { useApp } from "../contexts/App"
import AboutMe from "./../containers/AboutMe/AboutMe"
import Steps from "./../containers/Steps/Steps"

const MainPage: FC = () => {
  const { isLetsStartedFormVisible } = useApp()

  return (
    <React.Fragment>
      <Hero />
      <WeDo />
      <WeUse />
      <Cases />
      <Steps />
      <AboutMe />
      {isLetsStartedFormVisible && <LetsStartedForm />}
    </React.Fragment>
  )
}

export default MainPage
