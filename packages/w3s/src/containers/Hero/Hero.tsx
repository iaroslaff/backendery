import { FC, useEffect, useRef } from "react"
import Typed from "typed.js"

import { SvgIcon } from "../../components/elements/Icon"
import { useApp } from "../../contexts/App"

import "./Hero.scss"

// prettier-ignore
const pythonCodes: string[] = [
`@strawberry.type
class Author:
    name: str
    posts: list[Post] = strawberry.field(resolver=get_posts_for_author)

def get_authors(root) -> list[Author]:
    return [Author(name="Guido van Rossum")]
`,
`@ctx.asynccontextmanager
async def lifespan(app: ASGIApp) -> AsyncIterator[None]:
    cfg = app.state.config
    async with (
        create_async_client(**cfg.dbase.edb) as app.state.edb,
        create_async_client(**cfg.dbase.rds) as app.state.rdb
    ): yield  # noqa: E701
`
] as const

// prettier-ignore
const rustCodes: string[] = [
`#[derive(Debug, Display)]
pub enum State { Start, Transient, Closed }

impl From&lt;&amp;'a str&gt; for State {
    fn from(state: &amp;'a str) -> Self {
        match state {
            "start"  => State::Start,
            "closed" => State::Closed,
            _ => unreachable!(),
        }
    }
}
`
] as const

const Hero: FC = () => {
  const { setLetsStartedFormVisibility } = useApp()

  const pyRef = useRef(null)
  const rsRef = useRef(null)

  const typedOptions = {
    cursorChar: "",
    fadeOut: true,
    fadeOutDelay: 90,
    loop: true,
  }

  useEffect(() => {
    const typed = new Typed(pyRef.current, {
      ...typedOptions,
      strings: [...pythonCodes],
      typeSpeed: 15,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  useEffect(() => {
    const typed = new Typed(rsRef.current, {
      ...typedOptions,
      strings: [...rustCodes],
      typeSpeed: 45,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <section className={"hero__section"}>
      <div className={"hero__offer"}>
        <div className={"hero__description-wrapper"}>
          <button
            className={"hero__start-project-btn"}
            onClick={() => {
              setLetsStartedFormVisibility(true)
            }}
          >
            Start
            <br />a project
          </button>
          <p className={"hero__description"}>
            These words don&apos;t just describe our approach, they are the foundation
          </p>
        </div>
        <div className={"hero__title-wrapper"}>
          <h2 className={"hero__title-word"}>
            Robust<span>.</span>
          </h2>
          <h2 className={"hero__title-word"}>
            Flexible<span>.</span>
          </h2>
          <h2 className={"hero__title-word"}>
            Intuitive<span>.</span>
          </h2>
        </div>
      </div>
      <div className={"hero__code-container"}>
        <div className={"hero__code hero__code--python"}>
          <pre>
            <code ref={pyRef} className={"language-python"}></code>
          </pre>
        </div>
        <div className={"hero__code hero__code--rust"}>
          <pre>
            <code ref={rsRef} className={"language-rust"}></code>
          </pre>
        </div>
        <div className={"hero__lets-watch"}>
          <span>Let&apos;s watch</span>
          <button className={"hero__lets-watch-circle"}>
            <SvgIcon name={"arrow-watch-white"} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
