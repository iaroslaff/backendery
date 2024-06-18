import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FC, useRef } from "react"

import { useBreakpoints } from "../../hooks/useBreakpoints"

import "./WeUse.scss"

const WeUse: FC = () => {
  /** hooks */
  const { isSmartphone, isTablet, isSmallLaptop, isLaptop, isPC } = useBreakpoints()

  /** refs */
  const refSection = useRef<HTMLElement>(null)
  const refTitle = useRef<HTMLHeadingElement>(null)
  const refDescription = useRef<HTMLParagraphElement>(null)
  const refToolSet = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      let scrollTrigger = null

      ;(isSmallLaptop || isLaptop || isPC) &&
        (ScrollTrigger.create({
          trigger: refTitle.current,
          start: "top 5%",
          end: "bottom 65%",
          endTrigger: refToolSet.current,
          pinSpacing: false,
          pin: true,
        }),
        ScrollTrigger.create({
          trigger: refDescription.current,
          start: "center center",
          end: "bottom 55%",
          endTrigger: refToolSet.current,
          pinSpacing: false,
          pin: true,
        }),
        (scrollTrigger = ScrollTrigger.create({
          trigger: refSection.current,
          start: "top center",
        })),
        gsap.from(refTitle.current, {
          duration: 0.85,
          ease: "power4.out",
          opacity: 0,
          scrollTrigger: scrollTrigger,
          y: 60,
        }))
      ;(isSmartphone || isTablet) &&
        ((scrollTrigger = ScrollTrigger.create({
          trigger: refSection.current,
          start: "top 80%",
        })),
        gsap.from(refTitle.current, {
          duration: 0.85,
          ease: "power4.out",
          opacity: 0,
          scrollTrigger: scrollTrigger,
          y: 60,
        }))

      gsap.utils.toArray(".we-use__card").forEach(x => {
        const card = x as HTMLElement
        card.classList.add("_no-tap")

        scrollTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          end: "top 75%",
        })

        gsap.fromTo(
          card,
          {
            opacity: 0,
          },
          {
            duration: 0.85,
            ease: "expo.in",
            opacity: 1,
            scrollTrigger: scrollTrigger,
            stagger: 0.25,
            onStart: () => {
              const title = card.querySelector(".we-use__card-title")
              gsap.fromTo(
                title,
                {
                  x: 60,
                },
                {
                  delay: 0.25,
                  duration: 0.7,
                  ease: "power4.out",
                  x: 0,
                }
              )
            },
          }
        )
      })
    },
    { scope: refSection }
  )

  return (
    <section className={"we-use__section"} ref={refSection}>
      <div className={"we-use__heading"}>
        <h2 className={"we-use__heading-title"} ref={refTitle}>
          We use
        </h2>
        <p className={"we-use__heading-description"} ref={refDescription}>
          We cover the full range of services for analysis, <span>development and support of your online business</span>
        </p>
      </div>
      <div className={"we-use__toolset"} ref={refToolSet}>
        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Language</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              Python
            </div>
            <div className={"we-use__card-tools-particular"}>
              Rust
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Framework</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>Asyncio</div>
            <div className={"we-use__card-tools-particular"}>Tokio</div>
            <div className={"we-use__card-tools-particular"}>AioHttp</div>
            <div className={"we-use__card-tools-particular"}>FastAPI</div>
            <div className={"we-use__card-tools-particular"}>Axum</div>
            <div className={"we-use__card-tools-particular"}>SQLAlchemy</div>
            <div className={"we-use__card-tools-particular"}>Peewee</div>
            <div className={"we-use__card-tools-particular"}>SQLx</div>
            <div className={"we-use__card-tools-particular"}>Diesel</div>
            <div className={"we-use__card-tools-particular"}>Celery</div>
            <div className={"we-use__card-tools-particular"}>Pydantic</div>
            <div className={"we-use__card-tools-particular"}>Serde</div>
            <div className={"we-use__card-tools-particular"}>Hydra</div>
            <div className={"we-use__card-tools--text"}>
              <p>... and others</p>
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Database</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>PostgreSQL</div>
            <div className={"we-use__card-tools-particular"}>EdgeDB</div>
            <div className={"we-use__card-tools-particular"}>MongoDB</div>
            <div className={"we-use__card-tools-particular"}>Redis</div>
            <div className={"we-use__card-tools-particular"}>Elasticsearch</div>
            <div className={"we-use__card-tools-particular"}>FirebaseRDB</div>
            <div className={"we-use__card-tools-particular"}>InfluxDB</div>
            <div className={"we-use__card-tools--text"}>
              <p>... and others</p>
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Message Queue</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              Kafka
            </div>
            <div className={"we-use__card-tools-particular"}>
              RabbitMQ
            </div>
            <div className={"we-use__card-tools-particular"}>
              Redis Pub/Sub
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Testing</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              PyTest
            </div>
            <div className={"we-use__card-tools-particular"}>
              Unittest
            </div>
            <div className={"we-use__card-tools-particular"}>
              Rust Test Module
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Containerization</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              Docker
            </div>
            <div className={"we-use__card-tools-particular"}>
              Kubernetes
            </div>
          </div>
        </div>

        <div className={"we-use__card"}>
          <h3 className={"we-use__card-title"}>Monitoring</h3>
          <p className={"we-use__card-description"}>
            As a digital designer and art director I help companies and organisations around the world connect with
            their audience and grow their business
          </p>
          <div className={"we-use__card-tools"}>
            <div className={"we-use__card-tools-particular"}>
              Prometheus
            </div>
            <div className={"we-use__card-tools-particular"}>
              Grafana
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeUse
