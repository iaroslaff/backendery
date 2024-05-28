import { useEffect, useState } from "react"

interface IUseScrollLock {
  isLocked: boolean
}
const useScrollLock = (flag: boolean): IUseScrollLock => {
  const [isLocked, setIsLocked] = useState<boolean>(false)

  useEffect(() => {
    const root = document.getElementById("root")
    if (root) {
      document.body.style.overflow = flag ? "hidden" : "auto"
      setIsLocked(true)
    }

    return () => {
      if (root) {
        setIsLocked(false)
        document.body.style.overflow = "auto"
      }
    }
  }, [flag])

  return {
    isLocked,
  }
}

export { useScrollLock }
