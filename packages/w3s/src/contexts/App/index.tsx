import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react"
import { useNetworkState } from "react-use"

interface IAppProps {
  /* Properties */
  isOnline: boolean
}

type AppProviderProps = PropsWithChildren<Partial<IAppProps>>

const initialAppProps: IAppProps = {
  isOnline: false,
}

const AppContext = createContext<IAppProps>(initialAppProps)

const AppProvider: FC<AppProviderProps> = ({ children, ...props }) => {
  const { online } = useNetworkState()
  const [isOnline, setOnline] = useState<boolean>(online || false)

  useEffect(() => {
    setOnline(online || false)
  }, [online])

  const appContextProps: IAppProps = { isOnline }

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
