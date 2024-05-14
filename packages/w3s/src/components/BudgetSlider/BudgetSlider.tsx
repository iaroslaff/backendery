import { FC, useEffect, useRef, useState } from "react"

import "./BudgetSlider.scss"

const BudgetSlider: FC = () => {
  const minLimit = 1
  const maxLimit = 50

  const [minValue, setMinValue] = useState(minLimit)
  const [maxValue, setMaxValue] = useState(maxLimit)

  const lshRangeRef = useRef<HTMLInputElement>(null)
  const rshRangeRef = useRef<HTMLInputElement>(null)

  const lshThumbRef = useRef<HTMLDivElement>(null)
  const rshThumbRef = useRef<HTMLDivElement>(null)

  const rangeRef = useRef<HTMLDivElement>(null)

  const setLeftRange = () => {
    if (lshRangeRef.current && rshRangeRef.current && lshThumbRef.current && rangeRef.current) {
      const minValue = Math.min(parseInt(lshRangeRef.current.value), parseInt(rshRangeRef.current.value) - 1)

      const percent = Math.round(
        ((minValue - parseInt(lshRangeRef.current.min)) /
          (parseInt(lshRangeRef.current.max) - parseInt(lshRangeRef.current.min))) *
          100
      )

      lshThumbRef.current.style.left = `${percent}%`
      rangeRef.current.style.left = `${percent}%`
    }
  }

  useEffect(() => {
    if (lshRangeRef.current) {
      setLeftRange()
      lshRangeRef.current.addEventListener("input", setLeftRange)
    }
    return () => {
      if (lshRangeRef.current) {
        lshRangeRef.current.removeEventListener("input", setLeftRange)
      }
    }
  }, [])

  const setRightRange = () => {
    if (rshRangeRef.current && rshThumbRef.current && rangeRef.current && lshRangeRef.current) {
      const maxValue = Math.max(parseInt(rshRangeRef.current.value), parseInt(lshRangeRef.current.value) + 1)

      const percent = Math.round(
        ((maxValue - parseInt(rshRangeRef.current.min)) /
          (parseInt(rshRangeRef.current.max) - parseInt(rshRangeRef.current.min))) *
          100
      )

      rshThumbRef.current.style.right = `${100 - percent}%`
      rangeRef.current.style.right = `${100 - percent}%`
    }
  }

  useEffect(() => {
    if (rshRangeRef.current) {
      setRightRange()
      rshRangeRef.current.addEventListener("input", setRightRange)
    }
    return () => {
      if (rshRangeRef.current) {
        rshRangeRef.current.removeEventListener("input", setRightRange)
      }
    }
  }, [])

  return (
    <div className={"budget-slider__container"}>
      <div className={"budget-slider__min-limit-budget"}>$ {minLimit}k</div>
      <div className={"budget-slider__wrapper"}>
        <input
          type={"range"}
          min={minLimit}
          max={maxLimit}
          ref={lshRangeRef}
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
          ref={rshRangeRef}
          value={maxValue}
          onChange={event => {
            const value = Math.max(+event.target.value, minValue + 1)
            setMaxValue(value)
          }}
        />
        <div className={"budget-slider__double-slider"}>
          <div className={"budget-slider__track"}> </div>
          <div className={"budget-slider__range"} ref={rangeRef}>
            <div className={"budget-slider__values"}>
              <div className={"budget-slider__left-value"}>$ {minValue}k</div>
              <span>-</span>
              <div className={"budget-slider__right-value"}>$ {maxValue}k</div>
            </div>
          </div>
          <div className={"budget-slider__thumb budget-slider__thumb--left"} ref={lshThumbRef}></div>
          <div className={"budget-slider__thumb budget-slider__thumb--right"} ref={rshThumbRef}></div>
        </div>
      </div>
      <div className={"budget-slider__max-limit-budget"}>$ {maxLimit}k</div>
    </div>
  )
}

export default BudgetSlider
