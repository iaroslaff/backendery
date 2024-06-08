import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FC, useRef } from "react"

import { SvgIcon } from "../../components/elements/Icon"
import { useBreakpoints } from "../../hooks/useBreakpoints"

import decorationCircle from "./../../assets/images/svg/decoration-circle.svg"
import iamImage from "./../../assets/images/jpeg/iam-image.jpeg"

import "./AboutUs.scss"

const AboutUs: FC = () => {
  const { isSmartphone, isTablet, isSmallLaptop, isLaptop, isPC } = useBreakpoints()

  const tagSectionRef = useRef<HTMLElement>(null)
  const tagTitleRef = useRef<HTMLHeadingElement>(null)
  const tagClientsSaidRef = useRef<HTMLDivElement>(null)
  const tagClientsSaidDecorationRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      let scrollTrigger = null

      ; (isSmallLaptop || isLaptop || isPC) &&
        ScrollTrigger.create({
          trigger: tagClientsSaidDecorationRef.current,
          start: "center center",
          end: "bottom 85%",
          endTrigger: tagClientsSaidRef.current,
          pinSpacing: false,
          pin: true,
        }),
        (scrollTrigger = ScrollTrigger.create({
          trigger: tagSectionRef.current,
          start: "top center",
        })),
        gsap.from(tagTitleRef.current, {
          duration: 0.85,
          ease: "power4.out",
          opacity: 0,
          scrollTrigger: scrollTrigger,
          y: 160,
        })

    }, {scope: tagSectionRef}
  )

  return (
    <section className={"about-us__section"} ref={tagSectionRef}>
      <div className={"about-us__title-wrapper"} ref={tagTitleRef}>
        <h2 className={"about-us__title"}>About</h2>
        <div className={"about-us__title-smaller"}>us</div>
      </div>
      <p className={"about-us__description"}>
        <span>Pellentesque euismod dapibus efficitur. Etiam est massa, viverra sed porta nec, porta quis felis. </span>
        Proin id gravida justo, tempus scelerisque dolor Aenean eu convallis velit. Ut non sapien felis. Curabitur justo
        massa, porttitor eget mauris quis, tempor pharetra lorem
      </p>
      <div className={"about-us__clients-said-wrapper"} ref={tagClientsSaidRef}>
        <div>
          <h4 className={"about-us__clients-said-title"}>Experience</h4>
          <p className={"about-us__clients-said-description"}>
            Etiam tortor elit, condimentum et suscipit non, sollicitudin quis quam. Donec in risus consectetur, tempor
            tortor id
          </p>
        </div>
        <div>
          <h4 className={"about-us__clients-said-title"}>Time</h4>
          <p className={"about-us__clients-said-description"}>
            Etiam tortor elit, condimentum et suscipit non, sollicitudin quis quam. Donec in risus consectetur, tempor
            tortor id
          </p>
        </div>
        <div>
          <h4 className={"about-us__clients-said-title"}>Quality</h4>
          <p className={"about-us__clients-said-description"}>
            Etiam tortor elit, condimentum et suscipit non, sollicitudin quis quam. Donec in risus consectetur, tempor
            tortor id
          </p>
        </div>
        <div>
          <h4 className={"about-us__clients-said-title"}>Reliability</h4>
          <p className={"about-us__clients-said-description"}>
            Etiam tortor elit, condimentum et suscipit non, sollicitudin quis quam. Donec in risus consectetur, tempor
            tortor id
          </p>
        </div>
      </div>
      <div className={"about-us__clients-said-decoration-wrapper"} ref={tagClientsSaidDecorationRef}>
        <h3 className={"about-us__clients-said-decoration-title"}>
          What <br />
          do clients <br />
          value in <br />
          our work
        </h3>
        <div >
          <SvgIcon className={"about-us__clients-said-decoration-circle"} name={"decoration-circle"} />
        </div>
        {/* <img className={"about-us__clients-said-decoration-circle"} src={decorationCircle} /> */}
      </div>
      <div className={"about-us__profile-wrapper"}>
        <img className={"about-us__iam-image"} src={iamImage} />
        <h6 className={"about-us__iam-name"}>Iaroslav Kirichok</h6>
        <p className={"about-us__iam-position"}>Founder, Principal Software Engineer</p>
        <p className={"about-us__iam-quote"}>
          <span className={"about-us__iam-decoration-quote"}>“</span>
          Maecenas sed cursus felis, id consequat odio. Pellentesque id tortor nec ipsum efficitur viverra vel vel
          neque. Cras euismod massa velit, sed hendrerit turpis
          <span className={"about-us__iam-decoration-quote"}>“</span>
        </p>
      </div>
    </section>
  )
}

export default AboutUs
