import React, { FC } from "react"

import NotFoundError from "../containers/errors/NotFoundError/NotFoundError"

const NotFoundPage: FC = () => {
  return (
    <React.Fragment>
      <NotFoundError />
    </React.Fragment>
  )
}

export default NotFoundPage
