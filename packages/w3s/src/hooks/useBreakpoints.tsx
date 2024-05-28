import { useMediaQuery } from "react-responsive"

enum Breakpoints {
  XS = 320,
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

type DeviceType = "smartphone" | "tablet" | "pC"

type BreakpointHook = { [key in `is${Capitalize<DeviceType>}`]: boolean } & { sizes: SizeMap }

function useBreakpoints(): BreakpointHook {
  return {
    isSmartphone: useMediaQuery({ minWidth: Breakpoints.XS, maxWidth: Breakpoints.SM }),
    isTablet: useMediaQuery({ minWidth: Breakpoints.SM + 1, maxWidth: Breakpoints.LG - 1 }),
    isPC: useMediaQuery({ minWidth: Breakpoints.LG }),
    sizes,
  }
}

export { Breakpoints, useBreakpoints }
