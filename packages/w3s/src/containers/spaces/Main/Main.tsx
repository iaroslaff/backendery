import { FC } from "react"

import { SvgIcon } from "@/components/elements/Icon"

import "./Main.scss"

/* prettier-ignore */
interface IMainProps { zoomOut: (event: React.MouseEvent) => void; }

const Main: FC<IMainProps> = ({ zoomOut }) => {
  return (
    <div className='virtual-space__main'>
      <div className='virtual-space__main__brand-name'>_backendery</div>
      <div className='virtual-space__main__title'>Reliable backend for your projects_</div>
      <div className='virtual-space__main__show-all-spaces' onClick={zoomOut}>
        <SvgIcon name='show-all-spaces' />
      </div>
    </div>
  )
}

export default Main
