import { FC } from "react"

import { SvgIcon } from "../../../components/elements/Icon"

import "./Main.scss"

/* prettier-ignore */
interface IMainProps { zoomOut: (event: React.MouseEvent) => void; }

const Main: FC<IMainProps> = ({ zoomOut }) => {
  return (
    <div className='virtual-space-main'>
      <div className='virtual-space-main__brand-name'>_backendery</div>
      <div className='virtual-space-main__title'>Reliable backend for your projects_</div>
      <div className='virtual-space-main__show-all' onClick={zoomOut}>
        <SvgIcon name='show-all' />
      </div>
    </div>
  )
}

export default Main
