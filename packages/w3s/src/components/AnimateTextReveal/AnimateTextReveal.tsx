import { motion } from "framer-motion"
import { FC, useEffect, useState } from "react"

/**
 * Define the props for the `AnimateTextReveal` component.
 */
interface IAnimateTextRevealProps {
  /**
   * @property {string} text The text to animate, revealing each character in random order.
   */
  text: string

  /**
   * @property {number} [interval = 150] An optional interval in milliseconds between revealing each
   * character.
   */
  interval?: number

  /**
   * @property {number} [duration = 0.5] An optional duration in seconds for the opacity transition
   * of each character.
   */
  duration?: number
}

/**
 * The `AnimatedTextReveal` component animates the reveal of characters in a given string, displaying
 * them one by one with a randomized order. Initially, all characters are hidden (opacity 0), and as
 * the animation progresses, each character's opacity transitions to 1.
 *
 * @component
 * @param {string} text The string of text to be animated and revealed.
 * @param {number} [interval = 150] An optional duration in milliseconds that specifies the interval
 * between revealing each character. Default is 150 milliseconds.
 * @param {number} [duration = 0.5] An optional total duration for the animation, determining how
 * long the entire text reveal will take. Default is 0.5 seconds.
 *
 * @example
 * ```tsx
 * <div>
 *   <AnimatedTextReveal text={"Hello, World!"} interval={500} duration={0.25} />
 * </div>
 * ```
 *
 * @returns {JSX.Element} Returns JSX markup that displays the animated text reveal effect.
 */
const AnimateTextReveal: FC<IAnimateTextRevealProps> = ({ text, interval = 150, duration = 0.5 }) => {
  /**
   * Reveals the next random character from the text. It updates the revealedChars state by adding
   * a randomly selected character index that has not been revealed yet. The function continues to
   * select random characters until all characters in the text are revealed. If all characters have
   * been revealed, it simply returns the current state without making any changes.
   *
   * @function
   */
  const revealNextChar = () => {
    setRevealedChars(prevChar => {
      if (prevChar.length < text.length) {
        let nextChar: number = -1
        do {
          // Select a random character
          nextChar = Math.floor(Math.random() * text.length)
          // Ensure the character hasn't been revealed yet
        } while (prevChar.includes(nextChar))
        // Add the randomly selected character index
        return [...prevChar, nextChar]
      }
      return prevChar
    })
  }

  /** @states */
  /**
   * State that holds an array of indices representing the characters from the input text that have
   * been revealed.
   *
   * Each index corresponds to a character in the original text, and the array is updated over time
   * as random characters are revealed one by one. The array starts empty and fills up until all
   * characters are displayed.
   *
   * @type {number[]} revealedChars - An array of revealed character indices.
   * @function setRevealedChars - A function to update the state of revealedChars.
   */
  const [revealedChars, setRevealedChars] = useState<number[]>([])

  useEffect(() => {
    // Reset the revealed characters before starting
    setRevealedChars([])

    const revealInterval = setInterval(() => {
      revealNextChar()

      if (revealedChars.length >= text.length) {
        // Stop when all characters are revealed
        clearInterval(revealInterval)
      }
    }, interval)

    // Clear the interval when the component is unmounted
    return () => clearInterval(revealInterval)
  }, [text, interval])

  return (
    <>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealedChars.includes(index) ? 1 : 0 }}
          transition={{ duration }}
        >
          {char}
        </motion.span>
      ))}
    </>
  )
}

export default AnimateTextReveal
