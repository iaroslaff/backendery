import { FC } from "react"

import AnimateSymbol from "../../../components/AnimateSymbol/AnimateSymbol"
import { SvgIcon } from "../../../components/elements/Icon"

import "./NotFoundError.scss"

const NotFoundError: FC = () => {
  return (
    <div className='not-found-error'>
      <div className='not-found-error__wrapper'>
        <div className='not-found-error__status-code'>404</div>
        <div className='not-found-error__message'>
          Sorry <br /> Page not found :/
        </div>
        <div
          className='not-found-error__go-to-home'
          onClick={(_: React.MouseEvent) => {
            document.location = "/"
          }}
        >
          Go to home page
          <SvgIcon name='green-arrow-right' />
        </div>
      </div>
      <div className='not-found-error__dots'>
        <AnimateSymbol
          symbol={"."}
          maxNumberOfSymbols={4}
          minInterval={1_000}
          maxInterval={2_500}
          initialSymbols={".."}
          style={{ color: "#ffffff" }}
        />
        <AnimateSymbol
          symbol={"."}
          maxNumberOfSymbols={7}
          minInterval={1_250}
          maxInterval={2_500}
          initialSymbols={"....."}
          style={{ color: "#67df8f" }}
        />
      </div>
    </div>
  )
}

export default NotFoundError
