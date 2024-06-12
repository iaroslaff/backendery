import { useLenis } from "@studio-freight/react-lenis"
import { useEffect, useState } from "react"

interface IUseScrollLock {
  /* Properties */
  isLocked: boolean
}
const useScrollLock = (flag: boolean): IUseScrollLock => {
  const [isLocked, setIsLocked] = useState<boolean>(false)
  const lenis = useLenis()

  useEffect(() => {
    setIsLocked(flag)
    flag ? (lenis && lenis.stop()) : (lenis && lenis.start())
  }, [flag])

  return {
    isLocked
  }
}

export { useScrollLock }
