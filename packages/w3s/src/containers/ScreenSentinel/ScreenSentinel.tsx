import { FC, useEffect, useState } from "react"

import { SvgIcon } from "../../components/elements/Icon"
import { addClass, removeClass } from "../../utils/fn"

import "./ScreenSentinel.scss"

const innerHeightThreshold = 600 as number

/**
 * Inspect if the window height is below a certain threshold.
 * @param {number} heightThreshold - The height threshold to compare with.
 * @returns {boolean} True if the window height is less than the threshold, false otherwise.
 * @function
 */
const isBelowThreshold = (heightThreshold: number): boolean => {
  return window.innerHeight < heightThreshold
}

/**
 * Updates the body's class based on screen height.
 * @param {boolean} isBelowThreshold - Whether the height is below the threshold.
 * @function
 */
const updateHtmlTag = (isBelowThreshold: boolean): void => {
  isBelowThreshold ? addClass(document.body, "small-height") : removeClass(document.body, "small-height")
}

const ScreenSentinel: FC = () => {
  /**
   * Handles the change in screen orientation/resize and updates state.
   * @function
   */
  const handleViewport = () => {
    setIsSmallHeight(isBelowThreshold(innerHeightThreshold))
    // Update body class based on the orientation
    updateHtmlTag(isBelowThreshold(innerHeightThreshold))
  }

  /**
   * Adds or removes event listeners for checking orientation changes.
   * @param {boolean} isAdd - If true, adds event listeners; if false, removes them.
   * @function
   */
  const manageEventListeners = (isAdd: boolean) => {
    const action = isAdd ? "addEventListener" : "removeEventListener"

    window[action]("orientationchange", handleViewport)
    window[action]("resize", handleViewport)
  }

  /** @states */
  const [isSmallHeight, setIsSmallHeight] = useState<boolean>(isBelowThreshold(innerHeightThreshold))

  useEffect(() => {
    // Initial orientation check on render
    manageEventListeners(true) // Add event listeners

    // Initial viewport inspection
    handleViewport()

    // Clean up event listeners on component unmount
    return () => manageEventListeners(false)
  }, [])

  return (
    <>
      {isSmallHeight && (
        <div className='screen-sentinel'>
          <div className='screen-sentinel__overlay'>
            <div className='screen-sentinel__message'>
              <SvgIcon name='rotate-device' />
              <p>Uh-oh! Please increase the height of your screen</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ScreenSentinel
