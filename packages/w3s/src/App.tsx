import { FC } from "react"
import { RouterProvider } from "react-router-dom"

import { AppProvider } from "./contexts/App"
import Router from "./pages/Router"

const App: FC = () => {
  return (
    <AppProvider>
      <RouterProvider router={Router} />
    </AppProvider>
  )
}

export default App
