import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"

import DefaultLayout from "../layouts/DefaultLayout"
import MainPage from "./MainPage"
import NotFoundPage from "./NotFoundPage"

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={"/"} element={<DefaultLayout />}>
        <Route index={true} element={<MainPage />} />
      </Route>
      <Route element={<NotFoundPage />} path={"*"} />
    </Route>
  )
)

export default Router
