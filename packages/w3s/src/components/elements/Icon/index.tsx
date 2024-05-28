import { FC, SVGProps } from "react"

import { ReactComponent as ArrowDecorationBWIcon } from "./icons/arrow-decoration-bw.svg"
import { ReactComponent as ArrowDecorationRDOpacityIcon } from "./icons/arrow-decoration-rd--opacity.svg"
import { ReactComponent as ArrowDecorationRDIcon } from "./icons/arrow-decoration-rd.svg"
import { ReactComponent as ArrowHrefTRDIcon } from "./icons/arrow-href-trd.svg"
import { ReactComponent as ArrowHrefTRYIcon } from "./icons/arrow-href-try.svg"
import { ReactComponent as DecorationAsteriskIcon } from "./icons/decoration-asterisk.svg"
import { ReactComponent as DecorationCircleIcon } from "./icons/decoration-circle.svg"
import { ReactComponent as DrawerCloseIcon } from "./icons/drawer-close.svg"
import { ReactComponent as DrawerOpenIcon } from "./icons/drawer-open.svg"
import { ReactComponent as LetsStartedFormCloseIcon } from "./icons/lets-started-form-close.svg"
import { ReactComponent as LogoIcon } from "./icons/logo.svg"
import { ReactComponent as WeDoAPIIcon } from "./icons/we-do-api.svg"
import { ReactComponent as WeDoAutomationToolsIcon } from "./icons/we-do-automation-tools.svg"
import { ReactComponent as WeDoBotsIcon } from "./icons/we-do-bots.svg"
import { ReactComponent as WeDoServerApplicationsIcon } from "./icons/we-do-server-applications.svg"
import { ReactComponent as WeDoServiceIntegrationsIcon } from "./icons/we-do-service-integrations.svg"
import { ReactComponent as WeUseLanguagePythonIcon } from "./icons/we-use-language-python.svg"
import { ReactComponent as WeUseLanguageRustIcon } from "./icons/we-use-language-rust.svg"

const icons = {
  "arrow-decoration-bw": ArrowDecorationBWIcon,
  "arrow-decoration-rd": ArrowDecorationRDIcon,
  "arrow-decoration-rd--opacity": ArrowDecorationRDOpacityIcon,
  "arrow-href-trd": ArrowHrefTRDIcon,
  "arrow-href-try": ArrowHrefTRYIcon,
  "drawer-close": DrawerCloseIcon,
  "drawer-open": DrawerOpenIcon,
  "decoration-asterisk": DecorationAsteriskIcon,
  "decoration-circle": DecorationCircleIcon,
  "lets-started-form-close": LetsStartedFormCloseIcon,
  "logo": LogoIcon,
  "we-do-api": WeDoAPIIcon,
  "we-do-automation-tools": WeDoAutomationToolsIcon,
  "we-do-bots": WeDoBotsIcon,
  "we-do-server-applications": WeDoServerApplicationsIcon,
  "we-do-service-integrations": WeDoServiceIntegrationsIcon,
  "we-use-language-python": WeUseLanguagePythonIcon,
  "we-use-language-rust": WeUseLanguageRustIcon,
} as const

export type SvgIconName = keyof typeof icons
type SvgIconProps = SVGProps<SVGSVGElement> & { name: SvgIconName }

const SvgIcon: FC<SvgIconProps> = ({ name, ...svgProps }) => {
  const Icon = icons[name] ?? null
  return Icon && <Icon {...svgProps} />
}

export { SvgIcon }
