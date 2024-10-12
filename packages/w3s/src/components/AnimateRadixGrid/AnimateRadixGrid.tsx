import React, { FC, memo, useEffect, useRef, useState } from "react"

import { randomBetween } from "../../utils/fn"

import "./AnimateRadixGrid.scss"

/**
 * Define the props for the `AnimateRadixGrid` component.
 */
interface IAnimateRadixGridProps {
  /**
   * @property {string[]} An array of symbols to be displayed in the grid cells.
   * Each cell will randomly display one of these symbols, and they can be updated over time.
   */
  symbols: string[]

  /**
   * @property {number} The number of rows in the grid. This defines the vertical size of the grid.
   */
  rows: number

  /**
   * @property {number} The number of columns in the grid. This defines the horizontal size of the grid.
   */
  cols: number

  /**
   * @property {number} The minimum interval (in milliseconds) for updating a random cell in the grid.
   * This interval defines how fast the grid will refresh.
   */
  minInterval: number

  /**
   * @property {number} The maximum interval (in milliseconds) for updating a random cell in the grid.
   * The actual update interval will be randomly chosen between `minInterval` and `maxInterval`.
   */
  maxInterval: number

  /**
   * @property {Array<[number, number]>} An optional array of tuples representing the coordinates (row,
   * column) of cells that should not be updated.
   * These cells will be considered unreachable and will not change their symbols during the animation.
   */
  unreachableCells?: Array<[number, number]>

  /**
   * @property {React.CSSProperties} Optional inline styles to be applied to the grid container,
   * allowing customization of grid appearance.
   */
  style?: React.CSSProperties
}

/**
 * Define the props for the `AnimateRadixCell` component.
 */
interface IAnimateRadixCellProps {
  /**
   * @property {string} The symbol to display inside the grid cell.
   * This is typically one of the symbols from the parent `AnimateRadixGrid` component's symbols array.
   */
  symbol: string

  /**
   * @property {boolean} A flag indicating whether the cell is unreachable.
   * If true, a special CSS class `unreachable` is applied to the cell, and no symbol is displayed.
   */
  isUnreachable: boolean
}

/**
 * `AnimateRadixCell` is a React memoized functional component representing an individual cell in
 * the `AnimateRadixGrid`. The cell can display a symbol and optionally be marked as unreachable,
 * which adds a specific class to the element for styling purposes.
 *
 * Behavior:
 * - Displays the symbol provided via props, unless the cell is marked as unreachable, in which case
 *   it shows nothing and applies an additional CSS class.
 *
 * @example
 * ```tsx
 * <AnimateRadixCell symbol="A" isUnreachable={false} />
 * ```
 */
const AnimateRadixCell: FC<IAnimateRadixCellProps> = memo(({ symbol, isUnreachable }) => {
  // Each cell displays a symbol and applies a "unreachable" class if it is in a unreachable state
  return <div className={`animate-radix-grid__cell ${isUnreachable ? "unreachable" : ""}`}>{symbol}</div>
})

/**
 * `AnimateRadixGrid` is a React functional component that renders an animated grid of symbols.
 * The grid allows for randomly updating its cells with a set of provided symbols within
 * a specified interval. Certain cells can be marked as "unreachable," meaning they will
 * not participate in the update process.
 *
 * Behavior:
 * - The component generates an initial grid with random symbols chosen from the `symbols` array.
 * - It uses an `IntersectionObserver` to detect when the component enters or exits the viewport,
 *   only starting the animation when the grid is visible.
 * - Cells are updated in random intervals between `minInterval` and `maxInterval`, with unreachable
 *   cells excluded from this update process.
 *
 * @example
 * ```tsx
 * <AnimateRadixGrid
 *   symbols={['A', 'B', 'C', 'D']}
 *   rows={5}
 *   cols={5}
 *   minInterval={500}
 *   maxInterval={1500}
 *   unreachableCells={[[0, 0], [2, 3]]}
 * />
 * ```
 */
const AnimateRadixGrid: FC<IAnimateRadixGridProps> = props => {
  /**
   * Create the initial grid with randomly selected symbols.
   * @function
   */
  const createInitialCells = () => {
    return Array.from(
      { length: props.rows * props.cols }, // Create an array of the total number of cells
      () => props.symbols[Math.floor(Math.random() * props.symbols.length)] // Select a random symbol for each cell
    )
  }

  /**
   * Update a random cell with a new symbol.
   * @function
   */
  const updateRandomCell = () => {
    let randomIndex = -1

    // Find a random index that is not a unreachable cell
    do {
      randomIndex = Math.floor(Math.random() * cells.length) // Get a random index
    } while (unreachableSet.has(randomIndex)) // Ensure the index is not for an unreachable cell

    // Generate a new random symbol
    const newSymbol = generateRandomSymbol()

    // Update the state with the new symbol
    setCells(prevCells => {
      const newCells = [...prevCells]
      newCells[randomIndex] = newSymbol // Update the selected cell
      return newCells
    })
  }

  /**
   * Generate a new random symbol from the list, with no restriction against reusing the current symbol.
   * @function
   */
  const generateRandomSymbol = () => {
    return props.symbols[Math.floor(Math.random() * props.symbols.length)]
  }

  /** @references */
  const gridRef = useRef<HTMLDivElement | null>(null) // Ref to the grid container
  const lastTimeRef = useRef<number | null>(null) // Ref to the store of the last update time for controlling animation timing

  /** @states */
  const [cells, setCells] = useState<string[]>(createInitialCells()) // Hold the current symbols in the grid
  const [isVisible, setIsVisible] = useState<boolean>(false) // Track if the component is visible

  // Firstly, validate `unreachableCells` to ensure that they are within bounds of the grid
  props.unreachableCells?.forEach(([row, col]) => {
    if (row < 0 || row >= props.rows || col < 0 || col >= props.cols) {
      throw new Error(`unreachable cell (${row}, ${col}) is out of bounds`)
    }
  })

  // Set of unreachable cell indices
  const unreachableSet = new Set(props.unreachableCells?.map(([row, col]) => row * props.cols + col))

  useEffect(() => {
    // Intersection Observer to detect when the component is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 } // Trigger when at least 10% of the component is visible
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

  useEffect(() => {
    if (!isVisible) return // Don't animate if the component is not visible

    // Animation loop that updates cells at random intervals
    const step = (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime // Initialize the last update time
      }

      // Calculate elapsed time since last update
      const elapsed = currentTime - lastTimeRef.current
      // Get a random interval between min and max
      const nextInterval = randomBetween(props.minInterval, props.maxInterval)

      // If enough time has elapsed, update a random cell
      if (elapsed >= nextInterval) {
        updateRandomCell()
        lastTimeRef.current = currentTime // Reset the last update time
      }

      requestAnimationFrame(step) // Continue the animation loop
    }

    // Start the animation
    const animationFrame = requestAnimationFrame(step)

    // Clean up the animation on component unmount
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, props.minInterval, props.maxInterval, updateRandomCell]) // Re-run the effect if props change

  return (
    <div
      className='animate-radix-grid'
      style={{
        gridTemplateColumns: `repeat(${props.cols}, 1fr)`, // Set the grid layout based on columns
        ...props.style, // Spread any additional styles
      }}
      ref={gridRef} // Assign the ref to the grid container
    >
      {cells.map((symbol, index) => (
        <AnimateRadixCell
          key={index}
          symbol={unreachableSet.has(index) ? "" : symbol} // Show an empty string if the cell is unreachable
          isUnreachable={unreachableSet.has(index)} // Pass the unreachable state to the cell
        />
      ))}
    </div>
  )
}

export default AnimateRadixGrid
