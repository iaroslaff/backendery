import { useMediaQuery } from "react-responsive"

enum Breakpoints {
  XS = 480,
  SM = 768,
  MD = 992,
  LG = 1200,
  XL = 1920,
}

type SizeMap = Readonly<{ [key in keyof typeof Breakpoints]: Breakpoints }>

const sizes: SizeMap = {
  XS: Breakpoints.XS,
  SM: Breakpoints.SM,
  MD: Breakpoints.MD,
  LG: Breakpoints.LG,
  XL: Breakpoints.XL,
} as const

type DeviceType = "smartphone" | "smallDevice" | "tablet" | "laptop" | "pC" | "largeDevice"

type BreakpointHook = { [key in `is${Capitalize<DeviceType>}`]: boolean } & { sizes: SizeMap }

const useBreakpoints = (): BreakpointHook => {
  return {
    isSmartphone: useMediaQuery({ maxWidth: Breakpoints.XS }),
    isSmallDevice: useMediaQuery({ minWidth: Breakpoints.XS + 1, maxWidth: Breakpoints.SM - 1 }),
    isTablet: useMediaQuery({ minWidth: Breakpoints.SM, maxWidth: Breakpoints.MD - 1 }),
    isLaptop: useMediaQuery({ minWidth: Breakpoints.MD, maxWidth: Breakpoints.LG - 1 }),
    isPC: useMediaQuery({ minWidth: Breakpoints.LG, maxWidth: Breakpoints.XL - 1 }),
    isLargeDevice: useMediaQuery({ minWidth: Breakpoints.XL }),
    sizes,
  }
}

export { Breakpoints, useBreakpoints }
