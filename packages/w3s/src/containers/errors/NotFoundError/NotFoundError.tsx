import { FC, useEffect, useRef } from "react"
import Typed from "typed.js"

import "./NotFoundError.scss"

const NotFoundError: FC = () => {
  const tagResetErrorAnchorRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(tagResetErrorAnchorRef && tagResetErrorAnchorRef.current, {
      cursorChar: "_",
      strings: ["return home?"],
      typeSpeed: 90,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div className={"not-found-error"}>
      <div className={"not-found-error__status-code"}>404</div>
      <div className={"not-found-error__emulator-of-console-text not-found-error__emulator-of-console-text--console-border"}>
        <div>{"#>"}&nbsp;uh-oh! page not found...</div>
        <div>{"#>"}&nbsp;<a ref={tagResetErrorAnchorRef} href={"/"}></a></div>
      </div>
      <div className={"not-found-error__what-next"}>
        Go ahead then
        <br />
        Click the terminal message
      </div>
    </div>
  )
}

export default NotFoundError
