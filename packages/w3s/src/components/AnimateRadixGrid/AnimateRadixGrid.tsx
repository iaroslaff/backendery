import React, { FC, memo, useEffect, useRef, useState } from "react"

import { randomInterval } from "../../utils/fn"

import "./AnimateRadixGrid.scss"

/**
 * define the props for the AnimateRadixGrid component
 */
interface IAnimateRadixGridProps {
  /**
   * @property {string[]} array of symbols to display
   */
  symbols: string[]

  /**
   * @property {number} number of rows in the grid
   */
  rows: number

  /**
   * @property {number} number of columns in the grid
   */
  cols: number

  /**
   * @property {number} minimum interval for cell updates
   */
  minInterval: number

  /**
   * @property {number} maximum interval for cell updates
   */
  maxInterval: number

  /**
   * @property {Array<[number, number]>} optional array of cell coordinates that should not be updated
   */
  unreachableCells?: Array<[number, number]>

  /**
   * @property {React.CSSProperties} optional additional styles for the grid
   */
  style?: React.CSSProperties
}

/**
 * сomponent for individual cells in the radix grid
 */
const AnimateRadixCell: FC<{ symbol: string; isUnreachable: boolean }> = memo(({ symbol, isUnreachable }) => {
  /** each cell displays a symbol and applies a "unreachable" class if it is in a unreachable state */
  return <div className={`animate-radix-grid__cell ${isUnreachable ? "unreachable" : ""}`}>{symbol}</div>
})

/**
 * main component for the animated radix grid
 */
const AnimateRadixGrid: FC<IAnimateRadixGridProps> = props => {
  /** validate unreachableCells to ensure that they are within bounds of the grid */
  props.unreachableCells?.forEach(([row, col]) => {
    if (row < 0 || row >= props.rows || col < 0 || col >= props.cols) {
      throw new Error(`unreachable cell (${row}, ${col}) is out of bounds`)
    }
  })

  /**
   * function to create the initial grid with randomly selected symbols
   */
  const createInitialCells = () => {
    return Array.from(
      { length: props.rows * props.cols }, // create an array of the total number of cells
      () => props.symbols[Math.floor(Math.random() * props.symbols.length)] // select a random symbol for each cell
    )
  }

  /** states */
  /** state to hold the current symbols in the grid */
  const [cells, setCells] = useState<string[]>(createInitialCells())
  /** track if the component is visible */
  const [isVisible, setIsVisible] = useState<boolean>(false)

  /** refs */
  /** reference to the grid container */
  const gridRef = useRef<HTMLDivElement | null>(null)
  /** reference to store the last update time for controlling animation timing */
  const lastTimeRef = useRef<number | null>(null)

  /** set of unreachable cell indices */
  const unreachableSet = new Set(props.unreachableCells?.map(([row, col]) => row * props.cols + col))

  /**
   * function to update a random cell with a new symbol
   */
  const updateRandomCell = () => {
    let randomIndex = -1

    /** find a random index that is not a unreachable cell */
    do {
      randomIndex = Math.floor(Math.random() * cells.length) // get a random index
    } while (unreachableSet.has(randomIndex)) // ensure the index is not for an unreachable cell

    /** generate a new random symbol */
    const newSymbol = generateRandomSymbol()

    /** update the state with the new symbol */
    setCells(prevCells => {
      const newCells = [...prevCells]
      newCells[randomIndex] = newSymbol // update the selected cell
      return newCells
    })
  }

  /**
   * function to generate a new random symbol from the list, with no restriction against
   * reusing the current symbol
   */
  const generateRandomSymbol = () => {
    return props.symbols[Math.floor(Math.random() * props.symbols.length)]
  }

  /** intersection Observer to detect when the component is in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 } // trigger when at least 10% of the component is visible
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current)
      }
    }
  }, [])

  /** starts the random cell update process when the component mounts */
  useEffect(() => {
    if (!isVisible) return // don't animate if the component is not visible

    /** animation loop that updates cells at random intervals */
    const step = (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime // initialize the last update time
      }

      const elapsed = currentTime - lastTimeRef.current // calculate elapsed time since last update
      const nextInterval = randomInterval(props.minInterval, props.maxInterval) // get a random interval between min and max

      /** if enough time has elapsed, update a random cell */
      if (elapsed >= nextInterval) {
        updateRandomCell()
        lastTimeRef.current = currentTime // reset the last update time
      }

      requestAnimationFrame(step) // continue the animation loop
    }

    /** start the animation */
    const animationFrame = requestAnimationFrame(step)

    /** clean up the animation on component unmount */
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, props.minInterval, props.maxInterval, updateRandomCell]) // re-run the effect if props change

  return (
    <div
      className='animate-radix-grid'
      style={{
        gridTemplateColumns: `repeat(${props.cols}, 1fr)`, // set the grid layout based on columns
        ...props.style, // spread any additional styles
      }}
      ref={gridRef} // assign the ref to the grid container
    >
      {cells.map((symbol, index) => (
        <AnimateRadixCell
          key={index}
          symbol={unreachableSet.has(index) ? "" : symbol} // show an empty string if the cell is unreachable
          isUnreachable={unreachableSet.has(index)} // pass the unreachable state to the cell
        />
      ))}
    </div>
  )
}

export default AnimateRadixGrid
