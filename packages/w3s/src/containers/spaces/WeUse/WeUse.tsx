import { FC, ReactNode, useRef } from "react"
import { Pagination, Virtual } from "swiper/modules"
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"

import { useBreakpoints } from "../../../hooks/useBreakpoints"

import "swiper/scss"
import "swiper/scss/pagination"

import "./WeUse.scss"

const WeUse: FC = () => {
  /** types */
  type CardContent = Record<string, ReactNode>

  /** hooks */
  const { isSmartphone, isSmallDevice } = useBreakpoints()

  /** refs */
  const swiperRef = useRef<SwiperClass | null>(null)

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
      {isSmartphone || isSmallDevice ? (
        <Swiper
          // allowTouchMove={false}
          centeredSlides={true}
          direction='horizontal'
          modules={[Pagination, Virtual]}
          onSwiper={(swiper: SwiperClass) => {
            swiperRef.current = swiper
          }}
          pagination={{
            dynamicBullets: true,
          }}
          resistance
          resistanceRatio={0}
          virtual
        >
          {content?.map((card: CardContent, index: number) => (
            <SwiperSlide key={index} virtualIndex={index}>
              {card.html}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        content?.map((card: CardContent, index: number) => (
          <div className='box' key={index}>
            {card.html}
          </div>
        ))
      )}
    </div>
  )
}

export default WeUse
