import { FC } from "react"
import { ReactTyped as Typed } from "react-typed"

import "./Steps.scss"

const Steps: FC = () => {
  return (
    <div className="steps">
      <h2 className="steps__title">
        <Typed strings={["Steps"]} typeSpeed={50} cursorChar='_' showCursor={true} startWhenVisible />
      </h2>
      <p className="steps__decorative-text-1">{'&//='}</p>
      <div className="steps__slider-navigation">
        <div className="steps__slider-navigation__btn">01</div>
        <div className="steps__slider-navigation__btn">02</div>
        <div className="steps__slider-navigation__btn">03</div>
        <div className="steps__slider-navigation__btn">04</div>
        <div className="steps__slider-navigation__btn">05</div>
      </div>

      <div className="steps__square"></div>

      <div className="steps__slider-title-container">
        <p className="steps__slider-title-value">/02</p>
        <h3 className="steps__slider-title">Development</h3>
      </div>

      <div className="steps__slider-description-container">
        <p className="steps__slider-description">
          Not everybody has an experienced frontend developer on their team. By joining our Discord
          server you can pick my brain with any frontend related questions.
          These one-on-one sessions give you direct access to my time and knowledge
        </p>
        <div className="steps__slider-description-list">
          <p>{'Learning to find.............[ ok ]'}</p>
          <p>{'Learning to find.............[ ok ]'}</p>
          <p>{'Learning to find.............[ ok ]'}</p>
        </div>
      </div>

      <p className="steps__decorative-text-2">{'*_<>***_{'}</p>

      <p className="steps__abstract-description">These sessions give you direct</p>

    </div>
  )
}

export default Steps