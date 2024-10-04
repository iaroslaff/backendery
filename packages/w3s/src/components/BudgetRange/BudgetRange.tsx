import { FC, useEffect, useRef, useState } from "react"

import "./BudgetRange.scss"

interface IBudgetRangeProps {
  currencyUnit: string
  max: number
  measureUnit: string
  min: number
}

const CORRECTION_DIVIDER = 1_000 as number

const BudgetRange: FC<IBudgetRangeProps> = props => {
  const minLimit = Math.round(props.min / CORRECTION_DIVIDER)
  const maxLimit = Math.round(props.max / CORRECTION_DIVIDER)

  /** refs */
  const leftRangeRef = useRef<HTMLInputElement | null>(null)
  const leftThumbRef = useRef<HTMLDivElement | null>(null)

  const rightRangeRef = useRef<HTMLInputElement | null>(null)
  const rightThumbRef = useRef<HTMLDivElement | null>(null)

  const refRange = useRef<HTMLDivElement | null>(null)

  /** states */
  const [minValue, setMinValue] = useState<number>(minLimit)
  const [maxValue, setMaxValue] = useState<number>(maxLimit)

  const setLeftRange = () => {
    if (leftRangeRef.current && rightRangeRef.current && leftThumbRef.current && refRange.current) {
      const minValue = Math.min(parseInt(leftRangeRef.current.value), parseInt(rightRangeRef.current.value) - 1)

      const percent = Math.round(
        ((minValue - parseInt(leftRangeRef.current.min)) /
          (parseInt(leftRangeRef.current.max) - parseInt(leftRangeRef.current.min))) *
          100
      )

      leftThumbRef.current.style.left = `${percent}%`
      refRange.current.style.left = `${percent}%`
    }
  }

  useEffect(() => {
    if (leftRangeRef.current) {
      setLeftRange()
      leftRangeRef.current.addEventListener("input", setLeftRange)
    }

    return () => {
      if (leftRangeRef.current) {
        leftRangeRef.current.removeEventListener("input", setLeftRange)
      }
    }
  }, [])

  const setRightRange = () => {
    if (rightRangeRef.current && rightThumbRef.current && refRange.current && leftRangeRef.current) {
      const maxValue = Math.max(parseInt(rightRangeRef.current.value), parseInt(leftRangeRef.current.value) + 1)

      const percent = Math.round(
        ((maxValue - parseInt(rightRangeRef.current.min)) /
          (parseInt(rightRangeRef.current.max) - parseInt(rightRangeRef.current.min))) *
          100
      )

      rightThumbRef.current.style.right = `${100 - percent}%`
      refRange.current.style.right = `${100 - percent}%`
    }
  }

  useEffect(() => {
    if (rightRangeRef.current) {
      setRightRange()
      rightRangeRef.current.addEventListener("input", setRightRange)
    }

    return () => {
      if (rightRangeRef.current) {
        rightRangeRef.current.removeEventListener("input", setRightRange)
      }
    }
  }, [])

  return (
    <div className='budget-range'>
      {
        /* prettier-ignore */
        <div className='budget-range__min-limit'>
          [{props.currencyUnit}{minLimit}{props.measureUnit}]
        </div>
      }
      <div className='budget-range__wrapper'>
        <input
          type={"range"}
          min={minLimit}
          max={maxLimit}
          ref={leftRangeRef}
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
          ref={rightRangeRef}
          value={maxValue}
          onChange={event => {
            const value = Math.max(+event.target.value, minValue + 1)
            setMaxValue(value)
          }}
        />
        <div className='budget-range__double-slider'>
          <div className='budget-range__track' />
          <div className='budget-range__range' ref={refRange}>
            <div className='budget-range__values'>
              <div className='budget-range__left-value'>
                {props.currencyUnit}
                {minValue}
                {props.measureUnit}
              </div>
              <span>-</span>
              <div className='budget-range__right-value'>
                {props.currencyUnit}
                {maxValue}
                {props.measureUnit}
              </div>
            </div>
          </div>
          <div className='budget-range__thumb budget-range__thumb--left' ref={leftThumbRef}></div>
          <div className='budget-range__thumb budget-range__thumb--right' ref={rightThumbRef}></div>
        </div>
      </div>
      {
        /* prettier-ignore */
        <div className='budget-range__max-limit'>
          [{props.currencyUnit}{maxLimit}{props.measureUnit}]
        </div>
      }
    </div>
  )
}

export default BudgetRange
