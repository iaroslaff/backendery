import { FC, useEffect, useRef } from "react"
import { FallbackProps } from "react-error-boundary"

import Typed from "typed.js"

import "./InternalServerError.scss"

const InternalServerError: FC<FallbackProps> = ({ error, resetErrorBoundary }: FallbackProps) => {
  const tagResetErrorAnchorRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const typed = new Typed(tagResetErrorAnchorRef && tagResetErrorAnchorRef.current, {
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
      <div className={"internal-server-error__status-code"}>50X</div>
      <div
        className={
          "internal-server-error__emulator-of-console-text internal-server-error__emulator-of-console-text--console-border"
        }
      >
        <div>{"#>"}&nbsp;oops! internal server error...</div>
        <div>
          {"#>"}&nbsp;<a onClick={() => resetErrorBoundary()} ref={tagResetErrorAnchorRef}></a>
        </div>
      </div>
      <div className={"internal-server-error__what-next"}>
        Go for it!
        <br />
        Click the terminal message
      </div>
    </div>
  )
}

export default InternalServerError
