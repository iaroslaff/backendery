import { FC, useEffect, useRef, useState } from "react"

import { addClass, removeClass } from "../../utils/fn"

import "./TiledWall.scss"

const TiledWall: FC = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null)

  const tiledWallRef = useRef<HTMLDivElement>(null)
  const tilesRef = useRef<NodeListOf<HTMLDivElement> | null>(null)

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

  const zoomIn = (): void => {
    if (tilesRef.current) {
      tilesRef.current.forEach(tile => {
        tile.removeEventListener("click", setTileAndZoomIt)
      })
    }

    if (mainContainerRef.current) {
      removeClass(mainContainerRef.current, "show-all")
    }
  }

  const zoomOut = (event: React.MouseEvent): void => {
    event.stopPropagation()

    if (mainContainerRef.current) {
      addClass(mainContainerRef.current, "show-all")
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
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        zoomIn()
      }
    }

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
          <span className='tile__navigate tile__navigate--up js-up'>up</span>
          <span className='tile__navigate tile__navigate--right-top js-up js-right'>up/right</span>
          <span className='tile__navigate tile__navigate--left-top js-up js-left'>up/left</span>
          <span className='tile__navigate tile__navigate--left js-left'>left</span>
          <span className='tile__navigate tile__navigate--right js-right'>right</span>
          <span className='tile__navigate tile__navigate--right-down js-down js-right'>down/right</span>
          <span className='tile__navigate tile__navigate--left-down js-down js-left'>down/left</span>
          <span className='tile__navigate tile__navigate--down js-down'>down</span>
          <span className='tile__zoom js-zoom' onClick={zoomOut}>
            View All
          </span>
          <h1>Main</h1>
        </div>
        {/* 1 */}
        <div className='tile' data-x-position='0' data-y-position='1'>
          <span className='tile__navigate tile__navigate--left js-left'>left</span>
          <span className='tile__navigate tile__navigate--right js-right'>right</span>
          <span className='tile__navigate tile__navigate--right-down js-down js-right'>down/right</span>
          <span className='tile__navigate tile__navigate--left-down js-down js-left'>down/left</span>
          <span className='tile__navigate tile__navigate--down js-down'>down</span>
          <h1>Up</h1>
        </div>
        {/* 2 */}
        <div className='tile' data-x-position='1' data-y-position='1'>
          <span className='tile__navigate tile__navigate--left-down js-down js-left'>down/left</span>
          <span className='tile__navigate tile__navigate--left js-left'>left</span>
          <span className='tile__navigate tile__navigate--down js-down'>down</span>
          <h1>Up Right</h1>
        </div>
        {/* 3 */}
        <div className='tile' data-x-position='1' data-y-position='0'>
          <span className='tile__navigate tile__navigate--up js-up'>up</span>
          <span className='tile__navigate tile__navigate--left-top js-up js-left'>up/left</span>
          <span className='tile__navigate tile__navigate--left js-left'>left</span>
          <span className='tile__navigate tile__navigate--left-down js-down js-left'>down/left</span>
          <span className='tile__navigate tile__navigate--down js-down'>down</span>
          <h1>Right</h1>
        </div>
        {/* 4 */}
        <div className='tile' data-x-position='1' data-y-position='-1'>
          <span className='tile__navigate tile__navigate--up js-up'>up</span>
          <span className='tile__navigate tile__navigate--left-top js-up js-left'>up/left</span>
          <span className='tile__navigate tile__navigate--left js-left'>left</span>
          <h1>Down Right</h1>
        </div>
        {/* 5 */}
        <div className='tile' data-x-position='0' data-y-position='-1'>
          <span className='tile__navigate tile__navigate--up js-up'>up</span>
          <span className='tile__navigate tile__navigate--left-top js-up js-left'>up/left</span>
          <span className='tile__navigate tile__navigate--right-top js-up js-right'>up/right</span>
          <span className='tile__navigate tile__navigate--left js-left'>left</span>
          <span className='tile__navigate tile__navigate--right js-right'>right</span>
          <h1>Down</h1>
        </div>
        {/* 6 */}
        <div className='tile' data-x-position='-1' data-y-position='-1'>
          <span className='tile__navigate tile__navigate--up js-up'>up</span>
          <span className='tile__navigate tile__navigate--right-top js-up js-right'>up/right</span>
          <span className='tile__navigate tile__navigate--right js-right'>right</span>
          <h1>Down Left</h1>
        </div>
        {/* 7 */}
        <div className='tile' data-x-position='-1' data-y-position='0'>
          <span className='tile__navigate tile__navigate--up js-up'>up</span>
          <span className='tile__navigate tile__navigate--right-top js-up js-right'>up/right</span>
          <span className='tile__navigate tile__navigate--right js-right'>right</span>
          <span className='tile__navigate tile__navigate--right-down js-down js-right'>down/right</span>
          <span className='tile__navigate tile__navigate--down js-down'>down</span>
          <h1>Left</h1>
        </div>
        {/* 8 */}
        <div className='tile' data-x-position='-1' data-y-position='1'>
          <span className='tile__navigate tile__navigate--right-down js-down js-right'>down/right</span>
          <span className='tile__navigate tile__navigate--right js-right'>right</span>
          <span className='tile__navigate tile__navigate--down js-down'>down</span>
          <h1>Up Left</h1>
        </div>
      </div>
    </div>
  )
}

export default TiledWall
