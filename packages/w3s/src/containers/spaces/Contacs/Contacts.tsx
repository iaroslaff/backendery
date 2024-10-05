import { FC } from "react"
import "./Contacts.scss"
import AnimateBinaryGrid from "../../../components/AnimateBinaryGrid/AnimateBinaryGrid"
import { SvgIcon } from "@/components/elements/Icon"

const Contacts: FC = () => { 
  return (
    <div className="virtual-space-contacts">

      <h2 className="virtual-space-contacts__title">Contacts_</h2>

      <div className="virtual-space-contacts__decor">
        <div className="virtual-space-contacts__square"></div>
        <p>{'*_<>***_{'}</p>
      </div>

      <div className="virtual-space-contacts__email-wrapper">
        <p className="virtual-space-contacts__description">Not everybody has an experienced frontend developer</p>
        <a className="virtual-space-contacts__email" href="">ask@backemdery.io</a>
      </div>

      <div className="virtual-space-contacts__social-wrapper">
        <a className="virtual-space-contacts__social-link" href="">
          Telegram
          <SvgIcon
            name="arrow-up"
          />
        </a>
        <a className="virtual-space-contacts__social-link" href="">
          Linkedin
          <SvgIcon
            name="arrow-up"
          />
        </a>
        <a className="virtual-space-contacts__social-link" href="">
          Facrbook
          <SvgIcon
            name="arrow-up"
          />
        </a>
      </div>

      <div className="virtual-space-contacts__decor-matrix-wrapper">
        <AnimateBinaryGrid
          symbols={['0', '1']}
          rows={7}
          cols={3}
          minInterval={500}
          maxInterval={1000}
          unreachableCells={[[3, 1], [4, 1], [5, 1], [6, 1], [4, 2], [5, 2], [6, 2]]}
        />
      </div>

    </div>
  )
}

export default Contacts
