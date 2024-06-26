import { ReactLenis } from "@studio-freight/react-lenis"
import gsap from "gsap"
import React, { FC, useEffect, useRef } from "react"

interface SmoothScrollProps {
  children: React.ReactNode
}

const SmoothScroll: FC<SmoothScrollProps> = ({ children }) => {
  /**
   * Lenis hasn't done an export of his props, so the best of solutions is
   * to declare the type for the reference as "any"
   */
  const refLenis = useRef<any>(null)

  useEffect(() => {
    function update(time: number) {
      refLenis.current?.lenis?.raf(time * 1_000)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
    }
  })

  return (
    <ReactLenis
      options={{
        autoResize: true,
        easing: (x: number) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
        lerp: 0.075,
      }}
      ref={refLenis}
      root
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll
