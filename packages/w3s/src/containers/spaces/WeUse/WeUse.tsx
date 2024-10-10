import { FC, ReactNode, useRef } from "react"

import { useBreakpoints } from "../../../hooks/useBreakpoints"

import "./WeUse.scss"

/** types */
type CardContent = Record<string, ReactNode>

const WeUse: FC = () => {

  /** hooks */
  const { isSmartphone, isSmallDevice } = useBreakpoints()

  const content: CardContent[] = [
    {
      html: (
        <div className='section'>
          <h2>Заголовок 1</h2>
          <p>Описание для секции 1</p>
          <ul>
            <li>Элемент списка 1</li>
            <li>Элемент списка 2</li>
          </ul>
        </div>
      ),
    },
    {
      html: (
        <div className='section'>
          <h2>Заголовок 2</h2>
          <p>Описание для секции 2</p>
        </div>
      ),
    },
  ]

  return (
    <div className='we-use'>
      {
        content?.map((card: CardContent, index: number) => (
          <div className='box' key={index}>
            {card.html}
          </div>
        ))
      }
    </div>
  )
}

export default WeUse
