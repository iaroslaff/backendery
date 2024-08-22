import { useEffect, useState } from "react"

export interface IUseModal {
  isOpen: boolean
  isVisible: boolean
}

const useModal = (flag: boolean): IUseModal => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isVisible, setVisibility] = useState<boolean>(false)

  useEffect(() => {
    if (flag) {
      setIsOpen(true)
      setTimeout(() => {
        document.body.style.overflow = "hidden"
        setVisibility(true)
      }, 50)
    } else {
      setVisibility(false)
      document.body.style.overflow = "auto"
      setTimeout(() => {
        setIsOpen(false)
      }, 200)
    }
  }, [flag])

  return {
    isOpen,
    isVisible,
  }
}

export { useModal }
