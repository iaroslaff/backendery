import { FC, SVGProps } from "react"

import { ReactComponent as APIIcon } from "./icons/api.svg"
import { ReactComponent as ArrowHrefDarkIcon } from "./icons/arrow-href-dark.svg"
import { ReactComponent as ArrowHrefYellowIcon } from "./icons/arrow-href-yellow.svg"
import { ReactComponent as ArrowOfferDarkIcon } from "./icons/arrow-offer-dark.svg"
import { ReactComponent as ArrowWatchWhiteIcon } from "./icons/arrow-watch-white.svg"
import { ReactComponent as AutomationToolsIcon } from "./icons/automation-tools.svg"
import { ReactComponent as BurgerIcon } from "./icons/burger.svg"
import { ReactComponent as DecorationAsteriskIcon } from "./icons/decoration-asterisk.svg"
import { ReactComponent as DecorationCircleIcon } from "./icons/decoration-circle.svg"
import { ReactComponent as LanguagePythonIcon } from "./icons/language-python.svg"
import { ReactComponent as LanguageRustIcon } from "./icons/language-rust.svg"
import { ReactComponent as LetsStartedFormCloseIcon } from "./icons/lets-started-form-close.svg"
import { ReactComponent as LogoIcon } from "./icons/logo.svg"
import { ReactComponent as ServerApplicationIcon } from "./icons/server-applications.svg"
import { ReactComponent as ServicesIntegrationIcon } from "./icons/services-integration.svg"
import { ReactComponent as TouchableMenuCloseIcon } from "./icons/touchable-menu-close.svg"

const icons = {
  "api": APIIcon,
  "arrow-href-dark": ArrowHrefDarkIcon,
  "arrow-href-yellow": ArrowHrefYellowIcon,
  "arrow-offer-dark": ArrowOfferDarkIcon,
  "arrow-watch-white": ArrowWatchWhiteIcon,
  "automation-tools": AutomationToolsIcon,
  "burger": BurgerIcon,
  "decoration-asterisk": DecorationAsteriskIcon,
  "decoration-circle": DecorationCircleIcon,
  "language-python": LanguagePythonIcon,
  "language-rust": LanguageRustIcon,
  "lets-started-form-close": LetsStartedFormCloseIcon,
  "logo": LogoIcon,
  "server-applications": ServerApplicationIcon,
  "services-integration": ServicesIntegrationIcon,
  "touchable-menu-close": TouchableMenuCloseIcon,
} as const

export type SvgIconName = keyof typeof icons
type SvgIconProps = SVGProps<SVGSVGElement> & { name: SvgIconName }

const SvgIcon: FC<SvgIconProps> = ({ name, ...svgProps }) => {
  const Icon = icons[name] ?? null
  return Icon && <Icon {...svgProps} />
}

export { SvgIcon }
