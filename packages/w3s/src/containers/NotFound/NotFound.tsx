import React, { FC } from "react"

import "./NotFound.scss"

const NotFound: FC = () => {
  return (
    <React.Fragment>
      <div className={"not-found__status-code"}>404</div>
      <div className={"not-found__emulator-of-console-text"}>{">_"}&nbsp;uh-oh! page not found...</div>
      <div className={"not-found__emulator-of-console-text"}>
        {">_"}&nbsp;<a href={"/"}>return home?</a>
        <span className={"not-found__emulator-of-console-cursor"}>_</span>
      </div>
      <div className={"not-found__what-next"}>
        Go ahead then.
        <br />
        Click the terminal message.
      </div>
    </React.Fragment>
  )
}

export default NotFound
