import { motion } from "framer-motion"
import React, { FC, useEffect, useState } from "react"

type SingleSymbol = string & { __singleSymbolBrand: never }

function assertSingleSymbol(symbol: string): SingleSymbol {
  if (symbol.length !== 1) {
    throw new Error("string must be exactly one symbol")
  }
  /** convert string to SingleSymbol type after checking */
  return symbol as SingleSymbol
}

interface IAnimateSymbolProps {
  symbol: string
  maxNumberOfSymbols: number
  minInterval: number
  maxInterval: number
  initialSymbols?: string
  style?: React.CSSProperties
}

const AnimateSymbol: FC<IAnimateSymbolProps> = props => {
  /** check the single and initial symbols */
  const singleSymbol = assertSingleSymbol(props.symbol)
  const validInitialSymbols = props.initialSymbols?.slice(0, props.maxNumberOfSymbols) ?? ""

  /** states */
  const [symbols, setSymbols] = useState<string>(validInitialSymbols)

  /** synchronize duration with minimum interval */
  const duration = props.minInterval / 1_000

  useEffect(() => {
    /** function to animate symbols */
    const animateSymbols = () => {
      const currentLength = symbols.length // current number of symbols

      /** conditions for adding or removing symbols */
      const canAdd = currentLength < props.maxNumberOfSymbols // can we add more symbols?
      const canRemove = currentLength > 1 // can we remove symbols? (at least 1 symbol must remain)

      /** ensure we don't try to add more symbols than allowed */
      const maxRandomCount = canAdd ? props.maxNumberOfSymbols - currentLength : currentLength - 1 // max number of symbols we can add
      const randomCount = Math.floor(Math.random() * maxRandomCount) + 1 // adding 1 to guarantee at least one addition or removal

      /** determine whether to add or remove symbols */
      const isAdding = canAdd && Math.random() < 0.5 // randomly choose to add symbols
      if (isAdding) {
        /**
         * - if we decide to add symbols
         * - determine the number of symbols to add
         */
        const countToAdd = Math.min(randomCount, props.maxNumberOfSymbols - currentLength)
        /** update the state by adding symbols */
        setSymbols(prevSeqSymbols => prevSeqSymbols + singleSymbol.repeat(countToAdd))
      } else if (canRemove) {
        /**
         * - if we decide to remove symbols
         * - determine the number of symbols to remove
         */
        const countToRemove = Math.min(randomCount, currentLength - 1) // keep at least 1 symbol
        /** update the state by removing symbols */
        setSymbols(prevSeqSymbols => prevSeqSymbols.slice(0, currentLength - countToRemove))
      }
    }

    /** function to generate a random interval between updates */
    const randomInterval = () => Math.random() * (props.maxInterval - props.minInterval) + props.minInterval

    /** set an interval for animating symbols */
    const interval = setInterval(animateSymbols, randomInterval())

    /** clear the interval when the component is unmounted */
    return () => clearInterval(interval)
  }, [symbols, singleSymbol, props.maxNumberOfSymbols, props.minInterval, props.maxInterval])

  return (
    <motion.p style={{ ...props.style }} transition={{ duration: duration, repeat: Infinity }}>
      {symbols}
    </motion.p>
  )
}

export default AnimateSymbol
