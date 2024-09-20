import { FC, useEffect, useRef, useState } from "react"

import "./FundingDoubleSlider.scss"

const FundingDoubleSlider: FC = () => {
  const minLimit = 1
  const maxLimit = 50

  const [minValue, setMinValue] = useState(minLimit)
  const [maxValue, setMaxValue] = useState(maxLimit)

  const refLshRange = useRef<HTMLInputElement>(null)
  const refRshRange = useRef<HTMLInputElement>(null)

  const refLshThumb = useRef<HTMLDivElement>(null)
  const refRshThumb = useRef<HTMLDivElement>(null)

  const refRange = useRef<HTMLDivElement>(null)

  const setLshRange = () => {
    if (refLshRange.current && refRshRange.current && refLshThumb.current && refRange.current) {
      const minValue = Math.min(parseInt(refLshRange.current.value), parseInt(refRshRange.current.value) - 1)

      const percent = Math.round(
        ((minValue - parseInt(refLshRange.current.min)) /
          (parseInt(refLshRange.current.max) - parseInt(refLshRange.current.min))) *
          100
      )

      refLshThumb.current.style.left = `${percent}%`
      refRange.current.style.left = `${percent}%`
    }
  }

  useEffect(() => {
    if (refLshRange.current) {
      setLshRange()
      refLshRange.current.addEventListener("input", setLshRange)
    }
    return () => {
      if (refLshRange.current) {
        refLshRange.current.removeEventListener("input", setLshRange)
      }
    }
  }, [])

  const setRshRange = () => {
    if (refRshRange.current && refRshThumb.current && refRange.current && refLshRange.current) {
      const maxValue = Math.max(parseInt(refRshRange.current.value), parseInt(refLshRange.current.value) + 1)

      const percent = Math.round(
        ((maxValue - parseInt(refRshRange.current.min)) /
          (parseInt(refRshRange.current.max) - parseInt(refRshRange.current.min))) *
          100
      )

      refRshThumb.current.style.right = `${100 - percent}%`
      refRange.current.style.right = `${100 - percent}%`
    }
  }

  useEffect(() => {
    if (refRshRange.current) {
      setRshRange()
      refRshRange.current.addEventListener("input", setRshRange)
    }
    return () => {
      if (refRshRange.current) {
        refRshRange.current.removeEventListener("input", setRshRange)
      }
    }
  }, [])

  return (
    <div className={"funding-double-slider__container"}>
      <div className={"funding-double-slider__min-limit"}>$ {minLimit}k</div>
      <div className={"funding-double-slider__wrap"}>
        <input
          type={"range"}
          min={minLimit}
          max={maxLimit}
          ref={refLshRange}
          value={minValue}
          onChange={event => {
            const value = Math.min(+event.target.value, maxValue - 1)
            setMinValue(value)
          }}
        />
        <input
          type={"range"}
          min={minLimit}
          max={maxLimit}
          ref={refRshRange}
          value={maxValue}
          onChange={event => {
            const value = Math.max(+event.target.value, minValue + 1)
            setMaxValue(value)
          }}
        />
        <div className={"funding-double-slider__double-slider"}>
          <div className={"funding-double-slider__track"}> </div>
          <div className={"funding-double-slider__range"} ref={refRange}>
            <div className={"funding-double-slider__values"}>
              <div className={"funding-double-slider__lsh-value"}>$ {minValue}k</div>
              <span>-</span>
              <div className={"funding-double-slider__rsh-value"}>$ {maxValue}k</div>
            </div>
          </div>
          <div className={"funding-double-slider__thumb funding-double-slider__thumb--lsh"} ref={refLshThumb}></div>
          <div className={"funding-double-slider__thumb funding-double-slider__thumb--rsh"} ref={refRshThumb}></div>
        </div>
      </div>
      <div className={"funding-double-slider__max-limit"}>$ {maxLimit}k</div>
    </div>
  )
}

export default FundingDoubleSlider
