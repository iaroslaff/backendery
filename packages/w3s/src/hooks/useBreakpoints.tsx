import { useMediaQuery } from "react-responsive"

enum Breakpoints {
  XS = 360,
  SM = 480,
  MD = 768,
  LG = 992,
  XL = 1280,
  XXL = 1536,
}

type SizeMap = Readonly<{ [key in keyof typeof Breakpoints]: Breakpoints }>

const sizes: SizeMap = {
  XS: Breakpoints.XS,
  SM: Breakpoints.SM,
  MD: Breakpoints.MD,
  LG: Breakpoints.LG,
  XL: Breakpoints.XL,
  XXL: Breakpoints.XXL,
} as const

type DeviceType = "smartphone" | "tablet" | "nonTouchable"

type BreakpointHook = { [key in `is${Capitalize<DeviceType>}`]: boolean } & { sizes: SizeMap }

function useBreakpoints(): BreakpointHook {
  return {
    isSmartphone: useMediaQuery({ maxWidth: Breakpoints.XS }),
    isTablet: useMediaQuery({ minWidth: Breakpoints.XS + 1, maxWidth: Breakpoints.LG - 1 }),
    isNonTouchable: useMediaQuery({ minWidth: Breakpoints.LG }),
    sizes,
  }
}

export { Breakpoints, useBreakpoints }
