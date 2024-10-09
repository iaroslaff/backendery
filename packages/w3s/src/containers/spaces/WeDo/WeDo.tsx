import { FC } from "react"
import "./WeDo.scss"

const WeDo: FC = () => { 
  return (
    <div className="wedo">
      <h2 className="wedo__title">We Do_</h2>
      <div className="wedo__decorative-square">
      </div>

      <div className="wedo__tabs-container">
        <div className="wedo__tabs-container__tab">
          <p className="wedo__tabs-container__tab__symbol">{'=>'}</p>
          <p className="wedo__tabs-container__tab__name">Server App</p>
        </div>
        <div className="wedo__tabs-container__tab">
          <p className="wedo__tabs-container__tab__symbol">{'??'}</p>
          <p className="wedo__tabs-container__tab__name">Services Integration</p>
        </div>
        <div className="wedo__tabs-container__tab">
          <p className="wedo__tabs-container__tab__symbol">{'||'}</p>
          <p className="wedo__tabs-container__tab__name">Api</p>
        </div>
        <div className="wedo__tabs-container__tab">
          <p className="wedo__tabs-container__tab__symbol">{'&&'}</p>
          <p className="wedo__tabs-container__tab__name">Automation Tools</p>
        </div>
        <div className="wedo__tabs-container__tab">
          <p className="wedo__tabs-container__tab__symbol">{'=='}</p>
          <p className="wedo__tabs-container__tab__name">Bots</p>
        </div>
      </div>

      <div className="wedo__description-container">
        <p className="wedo__description-container__animation-dots">..... <br /> ...</p>
        <p className="wedo__description-container__description">
          <span className="wedo__description-container__description__highlighter">*/ </span>
          Not everybody has an experienced frontend developer on their team.
          By Reliable backend for your projects joining our Discord server you can
          pick my brain with any frontend related questions.
          These one-on-one sessions give you direct access to my time and knowledge
          <span className="wedo__description-container__description__highlighter"> */</span>
        </p>
        <div className="wedo__description-container__list">
          <p className="wedo__description-container__list__item">{'Learning to find.............[ ok ]'}</p>
          <p className="wedo__description-container__list__item">{'Mentorships..................[ ok ]'}</p>
          <p className="wedo__description-container__list__item">{'Access to....................[ ok ]'}</p>
        </div>
      </div>

      <div className="wedo__decorative-symbols">../../</div>
      <div className="wedo__matrix">
        <p>011001</p>
        <p>0100100100</p>
      </div>

    </div>
  )
}

export default WeDo

