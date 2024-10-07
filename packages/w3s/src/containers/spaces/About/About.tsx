import { FC } from "react"
import "./About.scss"
import CEOImage from "../../../assets/images/ceo.jpg"

const About: FC = () => { 
  return (
    <div className="about">
      <h2 className='about__title'>About_</h2>
      <div className="about__description-wrapper">
        <p>{'*_<>*_{'}</p>
        <p className="about__description">
          <span className="about__description-bracket">{'['}</span> Not everybody has an experienced frontend developer
          on their team. By joining our Discord server you can pick my brain with
          any frontend related questions.These one-on-one sessions give you direct
          access to my time and knowledge <span className="about__description-bracket">{']'}</span>
        </p>
      </div>
      <div className="about__stats">
        <p className="about__stats-value">27</p>
        <p className="about__stats-description">./These sessions give you direct</p>
      </div>
      <div className="about__ceo">
        <div className="about__decorative-squares">
          <div className="about__decorative-square"></div>
          <div className="about__decorative-square"></div>
        </div>
        <div className="about__ceo-caption">
          <p className="about__ceo-name">Jaroslav</p>
          <p className="about__ceo-description">These sessions give you direct</p>
        </div>
        <div className="about__ceo-image-container">
          <img className="about__ceo-image" src={CEOImage} alt="" />
        </div>
      </div>
      <p className="about__decorative-text">{'[../]'}</p>
    </div>
  )
}


export default About