import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react"
import { useNetworkState } from "react-use"

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
