import { FC } from "react"

export interface ICardCase {
  title: string
  description: string
  tools: string[]
  image: string
}
interface ICardCaseProps extends ICardCase {
  theme?: "dark" | "light"
}

import "./CardCase.scss"

const CardCase: FC<ICardCaseProps> = ({ description, image, title, tools, theme }) => {
  return (
    <article className={`card-case ${theme === "light" ? "_light-theme" : "_dark-theme"}`}>
      <div className='card-case__content'>
        <h3 className='card-case__title'>{title}</h3>
        <p className='card-case__description'>{description}</p>
        <div className='card-case__tools'>
          <div className='card-case__tools-heading'>Used tools</div>
          <div className='card-case__tools-items'>
            {tools.map((el, key) => {
              return (
                <div key={key} className='card-case__tools-item'>
                  <img src={el} alt='' />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='card-case__image'>
        <img src={image} alt={title} />
      </div>
    </article>
  )
}

export default CardCase
