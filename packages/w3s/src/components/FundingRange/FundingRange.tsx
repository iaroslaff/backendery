import { FC, useEffect, useRef, useState } from "react"

import "./FundingRange.scss"

const FundingRange: FC = () => {
  const minLimit = 1
  const maxLimit = 50

  const [minValue, setMinValue] = useState(minLimit)
  const [maxValue, setMaxValue] = useState(maxLimit)

  const refLeftRange = useRef<HTMLInputElement>(null)
  const refRightRange = useRef<HTMLInputElement>(null)

  const refLeftThumb = useRef<HTMLDivElement>(null)
  const refRightThumb = useRef<HTMLDivElement>(null)

  const refRange = useRef<HTMLDivElement>(null)

  const setLeftRange = () => {
    if (refLeftRange.current && refRightRange.current && refLeftThumb.current && refRange.current) {
      const minValue = Math.min(parseInt(refLeftRange.current.value), parseInt(refRightRange.current.value) - 1)

      const percent = Math.round(
        ((minValue - parseInt(refLeftRange.current.min)) /
          (parseInt(refLeftRange.current.max) - parseInt(refLeftRange.current.min))) *
          100
      )

      refLeftThumb.current.style.left = `${percent}%`
      refRange.current.style.left = `${percent}%`
    }
  }

  useEffect(() => {
    if (refLeftRange.current) {
      setLeftRange()
      refLeftRange.current.addEventListener("input", setLeftRange)
    }
    return () => {
      if (refLeftRange.current) {
        refLeftRange.current.removeEventListener("input", setLeftRange)
      }
    }
  }, [])

  const setRightRange = () => {
    if (refRightRange.current && refRightThumb.current && refRange.current && refLeftRange.current) {
      const maxValue = Math.max(parseInt(refRightRange.current.value), parseInt(refLeftRange.current.value) + 1)

      const percent = Math.round(
        ((maxValue - parseInt(refRightRange.current.min)) /
          (parseInt(refRightRange.current.max) - parseInt(refRightRange.current.min))) *
          100
      )

      refRightThumb.current.style.right = `${100 - percent}%`
      refRange.current.style.right = `${100 - percent}%`
    }
  }

  useEffect(() => {
    if (refRightRange.current) {
      setRightRange()
      refRightRange.current.addEventListener("input", setRightRange)
    }
    return () => {
      if (refRightRange.current) {
        refRightRange.current.removeEventListener("input", setRightRange)
      }
    }
  }, [])

  return (
    <div className={"funding-range__container"}>
      <div className={"funding-range__min-limit"}>$ {minLimit}k</div>
      <div className={"funding-range__wrap"}>
        <input
          type={"range"}
          min={minLimit}
          max={maxLimit}
          ref={refLeftRange}
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
          ref={refRightRange}
          value={maxValue}
          onChange={event => {
            const value = Math.max(+event.target.value, minValue + 1)
            setMaxValue(value)
          }}
        />
        <div className={"funding-range__double-slider"}>
          <div className={"funding-range__track"}> </div>
          <div className={"funding-range__range"} ref={refRange}>
            <div className={"funding-range__values"}>
              <div className={"funding-range__left-value"}>$ {minValue}k</div>
              <span>-</span>
              <div className={"funding-range__right-value"}>$ {maxValue}k</div>
            </div>
          </div>
          <div className={"funding-range__thumb funding-range__thumb--left"} ref={refLeftThumb}></div>
          <div className={"funding-range__thumb funding-range__thumb--right"} ref={refRightThumb}></div>
        </div>
      </div>
      <div className={"funding-range__max-limit"}>$ {maxLimit}k</div>
    </div>
  )
}

export default FundingRange
