import React, { FC } from "react"
import { Outlet } from "react-router-dom"

import OrientationHold from "../containers/OrientationHold/OrientationHold"
import { useBreakpoints } from "../hooks/useBreakpoints"

const DefaultLayout: FC = () => {
  // The useBreakpoints hook de-structurization
  const { isSmartphone, isSmallDevice, isTablet } = useBreakpoints()

  return (
    <React.Fragment>
      {(isSmartphone || isSmallDevice || isTablet) && <OrientationHold />}
      <Outlet />
    </React.Fragment>
  )
}

export default DefaultLayout
