import { motion } from "framer-motion"
import { FC } from "react"

import AnimateTextReveal from "../../../components/AnimateTextReveal/AnimateTextReveal"

import "./Main.scss"

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
    <div className='main'>
      <div className='main__brand-name'>
        <AnimateTextReveal text={"backendery"} interval={115} duration={0} />
      </div>
      <div className='main__title'>{"Reliable backend for your projects"}</div>
      <motion.div
        className='main__show-all'
        onClick={zoomOut}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className='main__show-all-items'>
          {offsets.map((offset, index) => (
            <motion.div
              key={index}
              className='main__show-all-item'
              initial={{ opacity: 0, transform: `translate(${offset.x}px, ${offset.y}px)` }}
              animate={{ opacity: 1, transform: "translate(0, 0)" }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Main
