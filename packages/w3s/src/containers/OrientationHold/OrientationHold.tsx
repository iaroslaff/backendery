import { FC, useEffect, useState } from "react"

import { useBreakpoints } from "../../hooks/useBreakpoints"

import "./OrientationHold.scss"

const OrientationHold: FC = () => {
  /**
   * Checks the current screen orientation and updates the isPortrait state accordingly.
   * @function
   */
  const checkOrientation = () => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      setIsPortrait(true) // Set true if the screen is in portrait orientation
    } else {
      setIsPortrait(false) // Set false if the screen is in landscape orientation
    }
  }

  /** @states */
  const [isPortrait, setIsPortrait] = useState<boolean>(true) // Track current screen orientation: portrait (true) or landscape (false)

  // The useBreakpoints hook de-structurization
  const { isSmartphone, isSmallDevice, isTablet } = useBreakpoints()

  useEffect(() => {
    checkOrientation() // Check orientation on initial render

    // Add event listeners for window resize and orientation change
    window.addEventListener("resize", checkOrientation)
    window.addEventListener("orientationchange", checkOrientation)

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("resize", checkOrientation)
      window.removeEventListener("orientationchange", checkOrientation)
    }
  }, [])

  return (
    <>
      {!isPortrait && (isSmartphone || isSmallDevice || isTablet) && (
        <div className='orientation-hold-overlay'>
          <div className='orientation-hold-message'>
            <p>Please rotate your device to portrait orientation.</p>
          </div>
        </div>
      )}
    </>
  )
}

export default OrientationHold
