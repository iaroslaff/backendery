import { FC, useEffect, useRef, useState } from "react"

import { addClass, removeClass } from "../../utils/fn"
import WeUse from "../WeUse/WeUse"

import "./VirtualScene.scss"

const VirtualScene: FC = () => {
  /** refs */
  const virtualSceneRef = useRef<HTMLDivElement>(null)
  const virtualSceneWrapRef = useRef<HTMLDivElement>(null)
  const spacesRef = useRef<NodeListOf<HTMLDivElement> | null>(null)

  /** states */
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)

  const setPosition = (): void => {
    if (virtualSceneWrapRef.current) {
      virtualSceneWrapRef.current.style.transform = `translateX(${positionX}00%) translateY(${positionY}00%)`
    }
  }

  const setSpaceAndZoomIt = (event: MouseEvent): void => {
    const target = event.target as HTMLElement

    setPositionX(parseInt(target.getAttribute("data-x-position") || "0") * -1)
    setPositionY(parseInt(target.getAttribute("data-y-position") || "0"))
    setPosition()

    zoomIn()
  }

  const moveUp = (): void => {
    virtualSceneWrapRef.current && setPositionY(previousY => previousY + 1)
  }

  const moveRight = (): void => {
    virtualSceneWrapRef.current && setPositionX(previousX => previousX - 1)
  }

  const moveDown = (): void => {
    virtualSceneWrapRef.current && setPositionY(previousY => previousY - 1)
  }

  const moveLeft = (): void => {
    virtualSceneWrapRef.current && setPositionX(previousX => previousX + 1)
  }

  const toggleJsPrefixElementsVisibility = (hide: boolean): void => {
    const allElements = document.querySelectorAll("[class]")
    allElements.forEach(elt => {
      const elementClasses = elt.className.split(" ")
      const hasJsClass = elementClasses.some(cls => cls.startsWith("js-"))

      if (hasJsClass) {
        ;(elt as HTMLElement).style.display = hide ? "none" : ""
      }
    })
  }

  const zoomIn = (): void => {
    spacesRef.current?.forEach(space => {
      space.removeEventListener("click", setSpaceAndZoomIt)
    })

    if (virtualSceneRef.current) {
      removeClass(virtualSceneRef.current, "show-all")
      /* prettier-ignore */
      setTimeout(() => { toggleJsPrefixElementsVisibility(false) }, 450)
    }
  }

  const zoomOut = (event: React.MouseEvent): void => {
    event.stopPropagation()

    if (virtualSceneRef.current) {
      addClass(virtualSceneRef.current, "show-all")
      /* prettier-ignore */
      setTimeout(() => { toggleJsPrefixElementsVisibility(true) }, 150)
    }

    spacesRef.current?.forEach(space => {
      space.addEventListener("click", setSpaceAndZoomIt)
    })
  }

  /* prettier-ignore */
  useEffect(() => { setPosition() }, [positionX, positionY]);

  useEffect(() => {
    spacesRef.current = document.querySelectorAll(".virtual-space")
  }, [])

  useEffect(() => {
    const jsuElements = document.getElementsByClassName("js-up")
    const jsrElements = document.getElementsByClassName("js-right")
    const jsdElements = document.getElementsByClassName("js-down")
    const jslElements = document.getElementsByClassName("js-left")

    const navigationMap = [
      { elements: jsuElements, handler: moveUp },
      { elements: jsrElements, handler: moveRight },
      { elements: jsdElements, handler: moveDown },
      { elements: jslElements, handler: moveLeft },
    ]

    navigationMap.forEach(({ elements, handler }) => {
      Array.from(elements).forEach(elt => {
        elt.addEventListener("click", handler)
      })
    })

    return () => {
      navigationMap.forEach(({ elements, handler }) => {
        Array.from(elements).forEach(elt => {
          elt.removeEventListener("click", handler)
        })
      })
    }
  }, [])

  return (
    <div className='virtual-scene' ref={virtualSceneRef}>
      <div className="virtual-scene__wrap" ref={virtualSceneWrapRef}>
        {/* main */}
        <div className='virtual-space' data-x-position='0' data-y-position='0'>
          <span className='virtual-space__navigate virtual-space__navigate--up js-up'>we do</span>
          <span className='virtual-space__navigate virtual-space__navigate--right-top js-up js-right'>up/right</span>
          <span className='virtual-space__navigate virtual-space__navigate--left-top js-up js-left'>about us</span>
          <span className='virtual-space__navigate virtual-space__navigate--left js-left'>cases</span>
          <span className='virtual-space__navigate virtual-space__navigate--right js-right'>steps</span>
          <span className='virtual-space__navigate virtual-space__navigate--right-down js-down js-right'>contacts</span>
          <span className='virtual-space__navigate virtual-space__navigate--left-down js-down js-left'>let&apos;s start</span>
          <span className='virtual-space__navigate virtual-space__navigate--down js-down'>we use</span>
          <span className='virtual-space__zoom js-zoom' onClick={zoomOut}>
            view all
          </span>
          <div className='virtual-space__caption'>main</div>
        </div>
        {/* up */}
        <div className='virtual-space' data-x-position='0' data-y-position='1'>
          <span className='virtual-space__navigate virtual-space__navigate--left js-left'>about us</span>
          <span className='virtual-space__navigate virtual-space__navigate--right js-right'>up/right</span>
          <span className='virtual-space__navigate virtual-space__navigate--right-down js-down js-right'>steps</span>
          <span className='virtual-space__navigate virtual-space__navigate--left-down js-down js-left'>cases</span>
          <span className='virtual-space__navigate virtual-space__navigate--down js-down'>main</span>
          <div className='virtual-space__caption'>we do</div>
        </div>
        {/* up/right */}
        <div className='virtual-space' data-x-position='1' data-y-position='1'>
          <span className='virtual-space__navigate virtual-space__navigate--left-down js-down js-left'>main</span>
          <span className='virtual-space__navigate virtual-space__navigate--left js-left'>we do</span>
          <span className='virtual-space__navigate virtual-space__navigate--down js-down'>steps</span>
          <div className='virtual-space__caption'>up right</div>
        </div>
        {/* right */}
        <div className='virtual-space' data-x-position='1' data-y-position='0'>
          <span className='virtual-space__navigate virtual-space__navigate--up js-up'>up/right</span>
          <span className='virtual-space__navigate virtual-space__navigate--left-top js-up js-left'>we do</span>
          <span className='virtual-space__navigate virtual-space__navigate--left js-left'>main</span>
          <span className='virtual-space__navigate virtual-space__navigate--left-down js-down js-left'>we use</span>
          <span className='virtual-space__navigate virtual-space__navigate--down js-down'>contacts</span>
          <div className='virtual-space__caption'>steps</div>
        </div>
        {/* down/right */}
        <div className='virtual-space' data-x-position='1' data-y-position='-1'>
          <span className='virtual-space__navigate virtual-space__navigate--up js-up'>steps</span>
          <span className='virtual-space__navigate virtual-space__navigate--left-top js-up js-left'>main</span>
          <span className='virtual-space__navigate virtual-space__navigate--left js-left'>we use</span>
          <div className='virtual-space__caption'>contacts</div>
        </div>
        {/* down */}
        <div className='virtual-space' data-x-position='0' data-y-position='-1'>
          <span className='virtual-space__navigate virtual-space__navigate--up js-up'>main</span>
          <span className='virtual-space__navigate virtual-space__navigate--left-top js-up js-left'>cases</span>
          <span className='virtual-space__navigate virtual-space__navigate--right-top js-up js-right'>steps</span>
          <span className='virtual-space__navigate virtual-space__navigate--left js-left'>let&apos;s start</span>
          <span className='virtual-space__navigate virtual-space__navigate--right js-right'>contacts</span>
          <div className='virtual-space__caption'>we use</div>
        </div>
        {/* down/left */}
        <div className='virtual-space' data-x-position='-1' data-y-position='-1'>
          <span className='virtual-space__navigate virtual-space__navigate--up js-up'>cases</span>
          <span className='virtual-space__navigate virtual-space__navigate--right-top js-up js-right'>main</span>
          <span className='virtual-space__navigate virtual-space__navigate--right js-right'>we use</span>
          <div className='virtual-space__caption'>let&apos;s start</div>
        </div>
        {/* left */}
        <div className='virtual-space' data-x-position='-1' data-y-position='0'>
          <span className='virtual-space__navigate virtual-space__navigate--up js-up'>about us</span>
          <span className='virtual-space__navigate virtual-space__navigate--right-top js-up js-right'>we do</span>
          <span className='virtual-space__navigate virtual-space__navigate--right js-right'>main</span>
          <span className='virtual-space__navigate virtual-space__navigate--right-down js-down js-right'>we use</span>
          <span className='virtual-space__navigate virtual-space__navigate--down js-down'>let&apos;s start</span>
          <div className='virtual-space__caption'>cases</div>
        </div>
        {/* up/left */}
        <div className='virtual-space' data-x-position='-1' data-y-position='1'>
          <span className='virtual-space__navigate virtual-space__navigate--right-down js-down js-right'>main</span>
          <span className='virtual-space__navigate virtual-space__navigate--right js-right'>we do</span>
          <span className='virtual-space__navigate virtual-space__navigate--down js-down'>cases</span>
          <div className='virtual-space__caption'>about us</div>
        </div>
      </div>
    </div>
  )
}

export default VirtualScene
