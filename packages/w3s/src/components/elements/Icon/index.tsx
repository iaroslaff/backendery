import { FC, SVGProps } from "react"

import { ReactComponent as PythonIcon } from "./icons/python.svg"
import { ReactComponent as RustIcon } from "./icons/rust.svg"

const icons = {
  "python": PythonIcon,
  "rust": RustIcon
} as const

export type SvgIconName = keyof typeof icons
type SvgIconProps = SVGProps<SVGSVGElement> & { name: SvgIconName }

const SvgIcon: FC<SvgIconProps> = ({ name, ...svgProps }) => {
  const Icon = icons[name] ?? null
  return Icon && <Icon {...svgProps} />
}

export { SvgIcon }
