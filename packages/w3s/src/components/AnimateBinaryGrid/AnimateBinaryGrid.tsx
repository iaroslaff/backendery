import React, { FC, memo, useEffect, useState } from "react"

import "./AnimateBinaryGrid.scss"

interface IAnimateBinaryGridProps {
  symbols: string[]
  rows: number
  cols: number
  minInterval: number
  maxInterval: number
  /* optional array of cell coordinates that should be unreachable (not updated) */
  unreachableCells?: Array<[number, number]>
  style?: React.CSSProperties
}

const AnimateBinaryCell: FC<{ symbol: string; isHeld: boolean }> = memo(({ symbol, isHeld }) => {
  /** each cell displays a symbol and applies a "unreachable" class if it is in a unreachable state */
  return <div className={`animate-binary-grid__cell ${isHeld ? "unreachable" : ""}`}>{symbol}</div>
})

const AnimateBinaryGrid: FC<IAnimateBinaryGridProps> = props => {
  /** validate unreachableCells to ensure that they are within bounds of the grid */
  props.unreachableCells?.forEach(([row, col]) => {
    if (row < 0 || row >= props.rows || col < 0 || col >= props.cols) {
      throw new Error(`unreachable cell (${row}, ${col}) is out of bounds`)
    }
  })

  /** creates the initial grid with randomly selected symbols from the symbol list */
  const createInitialCells = () => {
    return Array.from(
      { length: props.rows * props.cols },
      () => props.symbols[Math.floor(Math.random() * props.symbols.length)]
    )
  }

  /** states */
  const [cells, setCells] = useState<string[]>(createInitialCells())

  /** convert unreachableCells to a Set to quickly check whether a cell is held */
  const unreachableSet = new Set(props.unreachableCells?.map(([row, col]) => row * props.cols + col))

  const updateRandomCell = () => {
    let randomIndex = -1

    /** find a random index that is not a held cell */
    do {
      randomIndex = Math.floor(Math.random() * cells.length)
    } while (unreachableSet.has(randomIndex))

    const newSymbol = generateRandomSymbol()

    /** update the symbol at the randomly selected index */
    setCells(prevCells => {
      const newCells = [...prevCells]
      newCells[randomIndex] = newSymbol

      return newCells
    })

    /** set a new random interval for the next cell update */
    const randomInterval = Math.random() * (props.maxInterval - props.minInterval) + props.minInterval

    setTimeout(updateRandomCell, randomInterval) // continue updating cells at random intervals
  }

  const generateRandomSymbol = () => {
    /**
     * generate a new random symbol from the list, with no restriction against
     * reusing the current symbol
     */
    return props.symbols[Math.floor(Math.random() * props.symbols.length)]
  }

  /** starts the random cell update process when the component mounts */
  useEffect(() => {
    const handle = setTimeout(updateRandomCell, props.minInterval)

    return () => {
      clearTimeout(handle) // clean up the timeout when the component unmounts
    }
  }, [props.symbols, props.minInterval, props.maxInterval])

  return (
    <div
      className='animate-binary-grid'
      style={{
        gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
        ...props.style,
      }}
    >
      {cells.map((symbol, index) => (
        <AnimateBinaryCell
          key={index}
          symbol={unreachableSet.has(index) ? "" : symbol} // if the cell is held, display an empty string
          isHeld={unreachableSet.has(index)} // pass the held state to the cell
        />
      ))}
    </div>
  )
}

export default AnimateBinaryGrid
