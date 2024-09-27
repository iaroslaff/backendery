import { FC, useEffect } from "react"
import { Outlet } from "react-router-dom"

const DefaultLayout: FC = () => {
  const VIEWPORT_UNIT = 0.01

  useEffect(() => {
    const setViewportDimensions = (): void => {
      const rootStyle = document.documentElement.style
      const { innerHeight, innerWidth } = window

      rootStyle.setProperty("--vh", `${innerHeight * VIEWPORT_UNIT}px`)
      rootStyle.setProperty("--vw", `${innerWidth * VIEWPORT_UNIT}px`)
    }

    setViewportDimensions()
    window.addEventListener("resize", setViewportDimensions)

    return () => window.removeEventListener("resize", setViewportDimensions)
  }, [])

  return <Outlet />
}

export default DefaultLayout
