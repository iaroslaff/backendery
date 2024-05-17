import { FC } from "react"

import "./NotFoundError.scss"

const NotFoundError: FC = () => {
  return (
    <div className={"not-found"}>
      <div className={"not-found__status-code"}>404</div>
      <div className={"not-found__emulator-of-console-text"}>
        <div>{"#>"}&nbsp;uh-oh! page not found... </div>
        <div>
          {"#>"}&nbsp;<a href={"/"}>return home</a>
          <span className={"not-found__emulator-of-console-cursor"}>_</span>
        </div>
      </div>
      <div className={"not-found__what-next"}>
        Go ahead then
        <br />
        Click the terminal message
      </div>
    </div>
  )
}

export default NotFoundError
