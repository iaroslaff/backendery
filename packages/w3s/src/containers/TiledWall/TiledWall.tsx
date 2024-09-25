import { FC, useEffect, useRef, useState } from "react"

import { addClass, removeClass } from "../../utils/fn"

import "./TiledWall.scss"

const TiledWall: FC = () => {
  /** refs */
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const tiledWallRef = useRef<HTMLDivElement>(null)
  const tilesRef = useRef<NodeListOf<HTMLDivElement> | null>(null)

  /** states */
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)

  const setPosition = (): void => {
    if (tiledWallRef.current) {
      tiledWallRef.current.style.transform = `translateX(${positionX}00%) translateY(${positionY}00%)`
      setTimeout(() => {
        if (tiledWallRef.current) {
          removeClass(tiledWallRef.current, "animate")
        }
      }, 600)
    }
  }

  const moveUp = (): void => {
    if (tiledWallRef.current) {
      addClass(tiledWallRef.current, "animate")
      setPositionY(previousY => previousY + 1)
    }
  }

  const moveRight = (): void => {
    if (tiledWallRef.current) {
      addClass(tiledWallRef.current, "animate")
      setPositionX(previousX => previousX - 1)
    }
  }

  const moveDown = (): void => {
    if (tiledWallRef.current) {
      addClass(tiledWallRef.current, "animate")
      setPositionY(previousY => previousY - 1)
    }
  }

  const moveLeft = (): void => {
    if (tiledWallRef.current) {
      addClass(tiledWallRef.current, "animate")
      setPositionX(previousX => previousX + 1)
    }
  }

  const toggleJsElementsVisibility = (hide: boolean): void => {
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
    if (tilesRef.current) {
      tilesRef.current.forEach(tile => {
        tile.removeEventListener("click", setTileAndZoomIt)
      })
    }

    if (mainContainerRef.current) {
      removeClass(mainContainerRef.current, "show-all")
      /* prettier-ignore */
      setTimeout(() => { toggleJsElementsVisibility(false) }, 450)
    }
  }

  const zoomOut = (event: React.MouseEvent): void => {
    event.stopPropagation()

    if (mainContainerRef.current) {
      addClass(mainContainerRef.current, "show-all")
      /* prettier-ignore */
      setTimeout(() => { toggleJsElementsVisibility(true) }, 150)
    }

    if (tilesRef.current) {
      tilesRef.current.forEach(tile => {
        tile.addEventListener("click", setTileAndZoomIt)
      })
    }
  }

  const setTileAndZoomIt = (event: MouseEvent): void => {
    const target = event.target as HTMLElement

    setPositionX(parseInt(target.getAttribute("data-x-position") || "0") * -1)
    setPositionY(parseInt(target.getAttribute("data-y-position") || "0"))
    setPosition()

    zoomIn()
  }

  /* prettier-ignore */
  useEffect(() => { setPosition() }, [positionX, positionY]);

  useEffect(() => {
    tilesRef.current = document.querySelectorAll(".tile")
  }, [])

  useEffect(() => {
    const uElements = document.getElementsByClassName("js-up")
    const rElements = document.getElementsByClassName("js-right")
    const dElements = document.getElementsByClassName("js-down")
    const lElements = document.getElementsByClassName("js-left")

    const navigationMap = [
      { elements: uElements, handler: moveUp },
      { elements: rElements, handler: moveRight },
      { elements: dElements, handler: moveDown },
      { elements: lElements, handler: moveLeft },
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

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => key === "Escape" && zoomIn()
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className='main-container' ref={mainContainerRef}>
      <div className='tiled-wall animate--none' ref={tiledWallRef}>
        {/* main tile */}
        <div className='tile' data-x-position='0' data-y-position='0'>
          <span className='tile__navigate tile__navigate--up js-up'>we do</span>
          <span className='tile__navigate tile__navigate--right-top js-up js-right'>up/right</span>
          <span className='tile__navigate tile__navigate--left-top js-up js-left'>about us</span>
          <span className='tile__navigate tile__navigate--left js-left'>cases</span>
          <span className='tile__navigate tile__navigate--right js-right'>steps</span>
          <span className='tile__navigate tile__navigate--right-down js-down js-right'>contacts</span>
          <span className='tile__navigate tile__navigate--left-down js-down js-left'>let&apos;s start</span>
          <span className='tile__navigate tile__navigate--down js-down'>we use</span>
          <span className='tile__zoom js-zoom' onClick={zoomOut}>
            View All
          </span>
          <h1>Main</h1>
        </div>
        {/* up */}
        <div className='tile' data-x-position='0' data-y-position='1'>
          <span className='tile__navigate tile__navigate--left js-left'>about us</span>
          <span className='tile__navigate tile__navigate--right js-right'>up/right</span>
          <span className='tile__navigate tile__navigate--right-down js-down js-right'>steps</span>
          <span className='tile__navigate tile__navigate--left-down js-down js-left'>cases</span>
          <span className='tile__navigate tile__navigate--down js-down'>main</span>
          <h1>we do</h1>
        </div>
        {/* up/right */}
        <div className='tile' data-x-position='1' data-y-position='1'>
          <span className='tile__navigate tile__navigate--left-down js-down js-left'>main</span>
          <span className='tile__navigate tile__navigate--left js-left'>we do</span>
          <span className='tile__navigate tile__navigate--down js-down'>steps</span>
          <h1>up right</h1>
        </div>
        {/* right */}
        <div className='tile' data-x-position='1' data-y-position='0'>
          <span className='tile__navigate tile__navigate--up js-up'>up/right</span>
          <span className='tile__navigate tile__navigate--left-top js-up js-left'>we do</span>
          <span className='tile__navigate tile__navigate--left js-left'>main</span>
          <span className='tile__navigate tile__navigate--left-down js-down js-left'>we use</span>
          <span className='tile__navigate tile__navigate--down js-down'>contacts</span>
          <h1>steps</h1>
        </div>
        {/* down/right */}
        <div className='tile' data-x-position='1' data-y-position='-1'>
          <span className='tile__navigate tile__navigate--up js-up'>steps</span>
          <span className='tile__navigate tile__navigate--left-top js-up js-left'>main</span>
          <span className='tile__navigate tile__navigate--left js-left'>we use</span>
          <h1>contacts</h1>
        </div>
        {/* down */}
        <div className='tile' data-x-position='0' data-y-position='-1'>
          <span className='tile__navigate tile__navigate--up js-up'>main</span>
          <span className='tile__navigate tile__navigate--left-top js-up js-left'>cases</span>
          <span className='tile__navigate tile__navigate--right-top js-up js-right'>steps</span>
          <span className='tile__navigate tile__navigate--left js-left'>let&apos;s start</span>
          <span className='tile__navigate tile__navigate--right js-right'>contacts</span>
          <h1>we use</h1>
        </div>
        {/* down/left */}
        <div className='tile' data-x-position='-1' data-y-position='-1'>
          <span className='tile__navigate tile__navigate--up js-up'>cases</span>
          <span className='tile__navigate tile__navigate--right-top js-up js-right'>main</span>
          <span className='tile__navigate tile__navigate--right js-right'>we use</span>
          <h1>let&apos;s start</h1>
        </div>
        {/* left */}
        <div className='tile' data-x-position='-1' data-y-position='0'>
          <span className='tile__navigate tile__navigate--up js-up'>about us</span>
          <span className='tile__navigate tile__navigate--right-top js-up js-right'>we do</span>
          <span className='tile__navigate tile__navigate--right js-right'>main</span>
          <span className='tile__navigate tile__navigate--right-down js-down js-right'>we use</span>
          <span className='tile__navigate tile__navigate--down js-down'>let&apos;s start</span>
          <h1>cases</h1>
        </div>
        {/* up/left */}
        <div className='tile' data-x-position='-1' data-y-position='1'>
          <span className='tile__navigate tile__navigate--right-down js-down js-right'>main</span>
          <span className='tile__navigate tile__navigate--right js-right'>we do</span>
          <span className='tile__navigate tile__navigate--down js-down'>cases</span>
          <h1>about us</h1>
        </div>
      </div>
    </div>
  )
}

export default TiledWall
