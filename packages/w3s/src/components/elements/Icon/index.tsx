import { FC, SVGProps } from "react"

import { ReactComponent as PythonIcon } from "./icons/python.svg"
import { ReactComponent as RustIcon } from "./icons/rust.svg"
import { ReactComponent as GreenArrowRightIcon } from "./icons/green-arrow-right.svg"
import { ReactComponent as ShowAllSpacesIcon } from "./icons/show-all-spaces.svg"

const icons = {
  "green-arrow-right": GreenArrowRightIcon,
  "python": PythonIcon,
  "rust": RustIcon,
  "show-all-spaces": ShowAllSpacesIcon
} as const

export type SvgIconName = keyof typeof icons
type SvgIconProps = SVGProps<SVGSVGElement> & { name: SvgIconName }

const SvgIcon: FC<SvgIconProps> = ({ name, ...svgProps }) => {
  const Icon = icons[name] ?? null
  return Icon && <Icon {...svgProps} />
}

export { SvgIcon }
