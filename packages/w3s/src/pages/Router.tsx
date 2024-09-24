import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"

import InternalServerError from "../containers/errors/InternalServerError/InternalServerError"
import DefaultLayout from "../layouts/DefaultLayout"
import MainPage from "./MainPage"
import NotFoundPage from "./NotFoundPage"

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      errorElement={
        <InternalServerError
          error={undefined}
          resetErrorBoundary={function (...args: any[]): void {
            document.location.reload()
          }}
        />
      }
    >
      <Route path={"/"} element={<DefaultLayout />}>
        <Route index={true} element={<MainPage />} />
      </Route>
      <Route element={<NotFoundPage />} path={"*"} />
    </Route>
  )
)

export default Router
