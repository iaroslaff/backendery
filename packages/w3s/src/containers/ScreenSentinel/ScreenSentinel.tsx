import React, { FC, useEffect, useState } from "react"

import { useBreakpoints } from "../../hooks/useBreakpoints"
import { addClass, removeClass } from "../../utils/fn"

import "./ScreenSentinel.scss"

/**
 * Determines if the device is in portrait orientation.
 * @returns {boolean} True if the device is in portrait orientation, false otherwise.
 * @function
 */
const isPortraitOrientation = (): boolean => {
  return screen.orientation?.type === "portrait-primary" || screen.orientation?.type === "portrait-secondary"
}

/**
 * Updates the body's class based on the screen orientation.
 * @param {boolean} portrait - Whether the device is in portrait mode.
 * @function
 */
const updateHtmlTag = (portrait: boolean): void => {
  portrait ? removeClass(document.body, "no-orientation") : addClass(document.body, "no-orientation")
}

const ScreenSentinel: FC = () => {
  /**
   * Handles the change in screen orientation and updates the `isPortrait` state.
   * @function
   */
  const handleOrientationChange = () => {
    setIsPortrait(isPortraitOrientation())
    // Update body class based on the orientation
    updateHtmlTag(isPortrait)
  }

  /**
   * Adds or removes event listeners for checking orientation changes.
   * @param {boolean} isAdd - If true, adds event listeners; if false, removes them.
   * @function
   */
  const manageEventListeners = (isAdd: boolean) => {
    const action = isAdd ? "addEventListener" : "removeEventListener"
    window[action]("orientationchange", handleOrientationChange)
  }

  /** @states */
  const [isPortrait, setIsPortrait] = useState<boolean>(isPortraitOrientation()) // Track current screen orientation

  // The useBreakpoints hook de-structurization
  const { isSmartphone, isSmallDevice, isTablet } = useBreakpoints()

  useEffect(() => {
    // Initial orientation check on render
    manageEventListeners(true) // Add event listeners

    // Clean up event listeners on component unmount
    return () => manageEventListeners(false)
  }, [])

  return (
    <React.Fragment>
      {!isPortrait && (isSmartphone || isSmallDevice || isTablet) && (
        <div className='screen-sentinel'>
          <div className='screen-sentinel__overlay'>
            <div className='screen-sentinel__message'>
              <p>Please rotate your device to portrait orientation.</p>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default ScreenSentinel
