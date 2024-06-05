import { FC, useEffect, useRef } from "react"
import { FallbackProps } from "react-error-boundary"
import Typed from "typed.js"

import "./InternalServerError.scss"

const InternalServerError: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const elementRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const typed = new Typed(elementRef && elementRef.current, {
      cursorChar: "_",
      strings: ["reload page?"],
      typeSpeed: 90,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div className={"internal-server-error"}>
      <div className={"internal-server-error__status-code"}>500</div>
      <div
        className={
          "internal-server-error__emulator-of-console-text internal-server-error__emulator-of-console-text--console-border"
        }
      >
        <div>{"#>"}&nbsp;oops! internal server error...</div>
        <div>{"#>"}&nbsp;<a onClick={() => resetErrorBoundary()} ref={elementRef}></a></div>
      </div>
      <div className={"internal-server-error__what-next"}>
        Go ahead then
        <br />
        Click the terminal message
      </div>
    </div>
  )
}

export default InternalServerError
