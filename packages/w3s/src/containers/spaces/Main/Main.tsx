import { FC } from "react"
import { ReactTyped as Typed } from "react-typed"

import AnimateTextReveal from "../../../components/AnimateTextReveal/AnimateTextReveal"

import "./Main.scss"
import { SvgIcon } from "../../../components/elements/Icon"

interface IMainProps {
  zoomOut: (event: React.MouseEvent) => void
}

const Main: FC<IMainProps> = ({ zoomOut }) => {
  /* prettier-ignore */
  const offsets = [
    { x: -18, y: -18 }, { x: 0, y: -18 }, { x: 18, y: -18 },
    { x: -18, y:   0 }, { x: 0, y:   0 }, { x: 18, y:   0 },
    { x: -18, y:  18 }, { x: 0, y:  18 }, { x: 18, y:  18 },
  ];

  return (
    <div className="main">
      <div className="main__brand-name">
        <AnimateTextReveal text={"backendery"} interval={115} duration={0} />
      </div>
      <div className="main__title">
        {"Reliable backend for your"}{" "}
        <span>
          <Typed
            strings={["applications", "ideas", "projects", "services"]}
            backDelay={4_500}
            backSpeed={50}
            typeSpeed={50}
            loop
            cursorChar="_"
            showCursor
          />
        </span>
      </div>
      <div className="main__show-all" onClick={zoomOut}>
        Show All
        <SvgIcon name="arrow-right" />
      </div>
    </div>
  );
}

export default Main
