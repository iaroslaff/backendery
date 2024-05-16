import { FC } from "react"

import { SvgIcon } from "../../components/elements/Icon"

import noImage from "./../../assets/images/no-image-placeholder.png"

import "./AboutUs.scss"

const AboutUs: FC = () => {
  return (
    <section className={"about-us__container"}>
      <div className={"about-us__content"}>
        <div className={"about-us__heading-section"}>
          <h2 className={"about-us__title-section"}>
            About
            <br />
            <span>us</span>
          </h2>
          <div className={"about-us__description-section"}>
            <p>
              <span>
                Pellentesque euismod dapibus efficitur. Etiam est massa, viverra sed porta nec, porta quis felis.
              </span>
              Proin id gravida justo, tempus scelerisque dolor Aenean eu convallis velit. Ut non sapien felis.
            </p>
            <p>Curabitur justo massa, porttitor eget mauris quis, tempor pharetra lorem</p>
          </div>
        </div>
        <div className={"about-us__body"}>
          <ul className={"about-us__list"}>
            <li className={"about-us__item-list"}>
              <div className={"about-us__item-title"}>Experience</div>
              <div className={"about-us__item-description"}>
                Etiam tortor elit, condimentum et suscipit non, sollicitudin quis quam. Donec in risus consectetur,
                tempor tortor id
              </div>
            </li>
            <li className={"about-us__item-list"}>
              <div className={"about-us__item-title"}>Time</div>
              <div className={"about-us__item-description"}>
                Etiam tortor elit, condimentum et suscipit non, sollicitudin quis quam. Donec in risus consectetur,
                tempor tortor id
              </div>
            </li>
            <li className={"about-us__item-list"}>
              <div className={"about-us__item-title"}>Quality</div>
              <div className={"about-us__item-description"}>
                Etiam tortor elit, condimentum et suscipit non, sollicitudin quis quam. Donec in risus consectetur,
                tempor tortor id
              </div>
            </li>
            <li className={"about-us__item-list"}>
              <div className={"about-us__item-title"}>Quality</div>
              <div className={"about-us__item-description"}>
                Etiam tortor elit, condimentum et suscipit non, sollicitudin quis quam. Donec in risus consectetur,
                tempor tortor id
              </div>
            </li>
          </ul>
          <div className={"about-us__title-wrapper"}>
            <div className={"about-us__decoration-title"}>
              <span>
                What <br />
                do clients value in our work
              </span>
              <SvgIcon name={"decoration-circle"} />
            </div>
          </div>
        </div>
        <div className={"about-us__profile me-profile"}>
          <div className={"me-profile__image"}>
            <img src={noImage} alt={""} />
          </div>
          <div className={"me-profile__name"}>Jaroslav Kirichok</div>
          <div className={"me-profile__position"}>Founder, Principal Software Developer</div>
          <div className={"me-profile__quote"}>
            <span>“</span>
            Maecenas sed cursus felis, id consequat odio. Pellentesque id tortor nec ipsum efficitur viverra vel vel
            neque. Cras euismod massa velit, sed hendrerit turpis<span>”</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
