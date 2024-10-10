import { FC } from "react"
import { ReactTyped as Typed } from "react-typed"

import "./Cases.scss"

const Cases: FC = () => { 
  return (
    <div className="cases">
      <h2 className="cases__title">
        <Typed strings={["Cases"]} typeSpeed={50} cursorChar='_' showCursor={true} startWhenVisible />
      </h2>
      <div className="cases__decorative-square"></div>
      <div className="cases__moving-string">
        <span className="cases__moving-string__brace">{'['}</span>
        <div className="cases__moving-string__string-box">
          <p>scale your code width</p>
        </div>
        <span className="cases__moving-string__brace">{']'}</span>
      </div>

      <div className="cases__cases-container">
        <div className="cases__single-case">
          <p className="cases__single-case__category">../Sport Betting</p>
          <h3 className="cases__single-case__title">Trading system</h3>
          <p className="cases__single-case__description">
            Choose how you want to add, edit, and update content at scale:
            visually in our plaheadless APIs. Optimize your SEO and improve
            discoverability with fine-tuned controls.
          </p>
          <p className="cases__single-case__tech-title">used technologies</p>
          <p className="cases__single-case__tech-list">
            Python, GitLab, NGINX, Docker, Stack, Bitbucket...
          </p>
        </div>

        <div className="cases__single-case">
          <p className="cases__single-case__category">../Sport Betting</p>
          <h3 className="cases__single-case__title">Trading system</h3>
          <p className="cases__single-case__description">
            Choose how you want to add, edit, and update content at scale:
            visually in our plaheadless APIs. Optimize your SEO and improve
            discoverability with fine-tuned controls.
          </p>
          <p className="cases__single-case__tech-title">used technologies</p>
          <p className="cases__single-case__tech-list">
            Python, GitLab, NGINX, Docker, Stack, Bitbucket...
          </p>
        </div>

        <div className="cases__single-case">
          <p className="cases__single-case__category">../Sport Betting</p>
          <h3 className="cases__single-case__title">Trading system</h3>
          <p className="cases__single-case__description">
            Choose how you want to add, edit, and update content at scale:
            visually in our plaheadless APIs. Optimize your SEO and improve
            discoverability with fine-tuned controls.
          </p>
          <p className="cases__single-case__tech-title">used technologies</p>
          <p className="cases__single-case__tech-list">
            Python, GitLab, NGINX, Docker, Stack, Bitbucket...
          </p>
        </div>
      </div>

      <div className="cases__cases-slider-container">
        <div className="cases__single-case">
          <p className="cases__single-case__category">../Sport Betting</p>
          <h3 className="cases__single-case__title">Trading system</h3>
          <p className="cases__single-case__description">
            Choose how you want to add, edit, and update content at scale:
            visually in our plaheadless APIs. Optimize your SEO and improve
            discoverability with fine-tuned controls.
          </p>
          <p className="cases__single-case__tech-title">used technologies</p>
          <p className="cases__single-case__tech-list">
            Python, GitLab, NGINX, Docker, Stack, Bitbucket...
          </p>
        </div>
      </div>

      <div className="cases__multi-container">
        <div className="cases__multi-container__indicators">
          <div className="cases__multi-container__indicator">{'[03]'}</div>
          <div className="cases__multi-container__indicator">{'[03]'}</div>
          <div className="cases__multi-container__indicator">{'[03]'}</div>
          <div className="cases__multi-container__indicator">{'[03]'}</div>
          <div className="cases__multi-container__indicator">{'[03]'}</div>
          <div className="cases__multi-container__indicator">{'[03]'}</div>
          <div className="cases__multi-container__indicator">{'[03]'}</div>
        </div>
        <p className="cases__multi-container__text">Our last cases</p>
        <div className="cases__multi-container__slider-navigation">
          <div className="steps__multi-container__slider-navigation__btn">01</div>
          <div className="steps__multi-container__slider-navigation__btn">02</div>
          <div className="steps__multi-container__slider-navigation__btn">03</div>
        </div>
      </div>

      <div className="cases__decorative-symbols">{'@#+=>??'}</div>
    </div>
  )
}

export default Cases