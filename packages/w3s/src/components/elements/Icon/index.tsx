import { FC, SVGProps } from "react"

import { ReactComponent as ArrowRightIcon } from "./icons/arrow-right.svg"
import { ReactComponent as ArrowTurnIcon } from "./icons/arrow-turn.svg"
import { ReactComponent as ArrowUpIcon } from "./icons/arrow-up.svg"
import { ReactComponent as ShowAllIcon } from "./icons/show-all.svg"

const icons = {
  "arrow-right": ArrowRightIcon,
  "arrow-turn": ArrowTurnIcon,
  "arrow-up": ArrowUpIcon,
  "show-all": ShowAllIcon
} as const

export type SvgIconName = keyof typeof icons
type SvgIconProps = SVGProps<SVGSVGElement> & { name: SvgIconName }

const SvgIcon: FC<SvgIconProps> = ({ name, ...svgProps }) => {
  const Icon = icons[name] ?? null
  return Icon && <Icon {...svgProps} />
}

export { SvgIcon }
