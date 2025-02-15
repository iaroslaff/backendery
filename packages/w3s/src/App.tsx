import { FC, useEffect, useState } from "react"
import { RouterProvider } from "react-router-dom"

import Preloader from "./containers/Preloader/Preloader"
import { AppProvider } from "./contexts/App"
import Router from "./pages/Router"

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleLoad = () => setIsLoading(false)

    Promise.all([
      new Promise(resolve => window.addEventListener("load", resolve, { once: true })),
      document.fonts.ready,
    ]).then(handleLoad)

    return () => window.removeEventListener("load", handleLoad)
  }, [])

  return <AppProvider>{isLoading ? <Preloader /> : <RouterProvider router={Router} />}</AppProvider>
}

export default App
