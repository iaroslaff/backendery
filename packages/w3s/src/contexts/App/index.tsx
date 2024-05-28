// import gsap from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger';
// import LocomotiveScroll from 'locomotive-scroll'
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react"
import { useNetworkState } from "react-use"

// gsap.registerPlugin(ScrollTrigger)

interface IAppProps {
  /* Properties */
  isDrawerVisible: boolean
  isLetsStartedFormVisible: boolean
  isOnline: boolean

  /* Getters, Setters */
  setDrawerVisibility: (flag: boolean) => void
  setLetsStartedFormVisibility: (flag: boolean) => void
}

type AppProviderProps = PropsWithChildren<Partial<IAppProps>>

const initialAppProps: IAppProps = {
  isDrawerVisible: false,
  isLetsStartedFormVisible: false,
  isOnline: false,

  setDrawerVisibility: () => {},
  setLetsStartedFormVisibility: () => {},
}

const AppContext = createContext<IAppProps>(initialAppProps)

const AppProvider: FC<AppProviderProps> = ({ children, ...props }) => {
  const { online } = useNetworkState()

  const [isDrawerVisible, setDrawerVisibility] = useState<boolean>(false)
  const [isLetsStartedFormVisible, setLetsStartedFormVisibility] = useState<boolean>(false)
  const [isOnline, setOnline] = useState<boolean>(online || false)

  useEffect(() => {
    setOnline(online || false)
  }, [online])

  // useEffect(() => {
  //   const scrollContainer = document.querySelector("[data-scroll-container]")
  //   if (scrollContainer instanceof HTMLElement) {
  //     const scroller = new LocomotiveScroll({
  //       el: scrollContainer,
  //       // smooth: true, // if false, the original scrollbar will be displayed
  //     })

  //     /**
  //      * Each time Locomotive Scroll updates, tell ScrollTrigger to update
  //      * too(sync positioning)
  //     */
  //     scroller.on("scroll", ScrollTrigger.update);

  //     ScrollTrigger.scrollerProxy(scrollContainer, {
  //       getBoundingClientRect() {
  //         return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  //       },
  //       // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  //       pinType: scrollContainer.style.transform ? "transform" : "fixed"
  //     });

  //     ScrollTrigger.addEventListener("refresh", () => { scroller.update() });
  //     ScrollTrigger.refresh();

  //     return () => {
  //       scroller.destroy()
  //     }
  //   } else {
  //     throw new Error("the scrolling container is missing")
  //   }
  // }, [])

  const appContextProps: IAppProps = {
    isDrawerVisible,
    isLetsStartedFormVisible,
    isOnline,

    setDrawerVisibility,
    setLetsStartedFormVisibility,
  }

  return (
    <AppContext.Provider
      value={{
        ...appContextProps,
        ...props,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useApp = () => useContext(AppContext)

export { AppProvider, useApp }
