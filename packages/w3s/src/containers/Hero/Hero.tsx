import { useGSAP } from "@gsap/react"
import { useLenis } from "@studio-freight/react-lenis"
import gsap from "gsap"
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
    posts: list[Post] = \\
      strawberry.field(resolver=get_posts_for_author)

def get_authors(root) -> list[Author]:
    return [Author(name="Guido van Rossum")]
`,
`@ctx.asynccontextmanager
async def lifespan(app: ASGIApp) -> AsyncIterator[None]:
    cfg = app.state.config
    async with (
        create_async_client(
            **cfg.dbase.edb) as app.state.edb,
        create_async_client(
            **cfg.dbase.rds) as app.state.rdb
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
      _ => unreachable!()
    }
  }
}
`,
`use axum::{
  extract::State,
  http::StatusCode,
  response::Json
};
use diesel::prelude::*;

table! {
  users (id) {
    id -&gt; Integer,
    name -&gt; Text
  }
}
`,
`#[derive(serde::Serialize, Selectable, Queryable)]
struct User {
  id: i32, name: String
}

fn internal_error<E>(err: E) -&gt; (StatusCode, String)
  where
    E: std::error::Error {
    (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
}
`,
`async fn list_users(
  State(pool): State&lt;deadpool_diesel::postgres::Pool&gt;
) -&gt; Result&lt;Json&lt;Vec&lt;User&gt;&gt;, (StatusCode, String)&gt; {
  let pg = pool.get().await.map_err(internal_error)?;
  let result = pg
    .interact(|pg| {
      users::table.select(User::as_select()).load(pg)
    })
    .await
    .map_err(internal_error)?
    .map_err(internal_error)?;
  Ok(Json(result))
}
`
] as const

const Hero: FC = () => {
  const { setLetsStartedFormVisibility } = useApp()
  const lenis = useLenis()

  const tagPyCodeRef = useRef<HTMLElement>(null)
  const tagRsCodeRef = useRef<HTMLElement>(null)
  const tagLetsStartProjectBtnRef = useRef<HTMLButtonElement>(null)

  // prettier-ignore
  const typedOptions: Record<string, number | boolean> = {
    fadeOut: true, fadeOutDelay: 90, loop: true, showCursor: false, startDelay: 1_100
  }

  useEffect(() => {
    const typed = new Typed(tagPyCodeRef && tagPyCodeRef.current, {
      ...typedOptions,
      strings: [...pythonCodes],
      typeSpeed: 15,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  useEffect(() => {
    const typed = new Typed(tagRsCodeRef && tagRsCodeRef.current, {
      ...typedOptions,
      strings: [...rustCodes],
      typeSpeed: 45,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from(
      ".hero__title-word",
      {
        duration: 0.85,
        ease: "power4.out",
        opacity: 0,
        stagger: 0.1,
        y: 40,
      },
      "+=0.25"
    )
      .from(
        ".hero__code",
        {
          duration: 0.85,
          ease: "power4.out",
          opacity: 0,
          y: 25,
        },
        "<0.55"
      )
      .from(
        ".hero__start-project-btn",
        {
          duration: 0.5,
          ease: "power1",
          opacity: 0,
        },
        ">"
      )
      .from(
        ".hero__start-project-btn span",
        {
          duration: 0.35,
          ease: "power2.inOut",
          opacity: 0,
        },
        ">"
      )
      .from(
        ".hero__description",
        {
          duration: 0.85,
          ease: "expo.out",
          opacity: 0,
          y: -25,
        },
        ">"
      )
      .from(
        ".hero__lets-watch",
        {
          duration: 0.85,
          ease: "power4.out",
          opacity: 0,
          y: 40,
        },
        "+=0.15"
      )
  })

  useGSAP((_, contextSafe) => {
    const onMouseMove =
      contextSafe &&
      contextSafe((event: MouseEvent) => {
        const elt = event.currentTarget as HTMLElement
        const bounding = elt.getBoundingClientRect() as DOMRect

        gsap.to(elt, {
          x: ((event.clientX - bounding.left) / elt.offsetWidth - 0.5) * 50,
          y: ((event.clientY - bounding.top) / elt.offsetHeight - 0.5) * 50,
          ease: "power4.out",
        })
      })

    const onMouseOut =
      contextSafe &&
      contextSafe((event: MouseEvent) => {
        const elt = event.currentTarget as HTMLElement

        gsap.to(elt, {
          x: 0,
          y: 0,
          ease: "power4.out",
        })
      })

    // prettier-ignore
    if (
         tagLetsStartProjectBtnRef.current
      && onMouseMove
      && onMouseOut
    ) {
      tagLetsStartProjectBtnRef.current.addEventListener("mousemove", onMouseMove);
      tagLetsStartProjectBtnRef.current.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      // prettier-ignore
      if (
           tagLetsStartProjectBtnRef.current
        && onMouseMove
        && onMouseOut
      ) {
        tagLetsStartProjectBtnRef.current.removeEventListener("mousemove", onMouseMove);
        tagLetsStartProjectBtnRef.current.removeEventListener("mouseout", onMouseOut);
      }
    }
  })

  return (
    <section className={"hero__section"}>
      <div className={"hero__offer"}>
        <div className={"hero__description-wrapper"}>
          <button
            className={"hero__start-project-btn"}
            onClick={() => {
              setLetsStartedFormVisibility(true)
            }}
            ref={tagLetsStartProjectBtnRef}
          >
            <span>
              Start <br /> a project
            </span>
          </button>
          <p className={"hero__description"}>
            These words don&apos;t just describe our approach, they are the foundation
          </p>
        </div>
        <div className={"hero__title-wrapper"}>
          <h2 className={"hero__title-word"}>Robust</h2>
          <h2 className={"hero__title-word"}>Flexible</h2>
          <h2 className={"hero__title-word"}>Intuitive</h2>
        </div>
      </div>
      <div className={"hero__code-wrapper"}>
        <div className={"hero__code hero__code--python"}>
          <pre>
            <code className={"language-python"} ref={tagPyCodeRef}></code>
          </pre>
        </div>
        <div className={"hero__code hero__code--rust"}>
          <pre>
            <code className={"language-rust"} ref={tagRsCodeRef}></code>
          </pre>
        </div>
        <div className={"hero__lets-watch"}>
          <span>Let&apos;s watch</span>
          <button
            className={"hero__lets-watch-circle"}
            onClick={() =>
              lenis?.scrollTo(".we-do__section", {
                lerp: 0.075,
                offset:
                  parseInt(
                    window
                      .getComputedStyle(document.querySelector(".we-do__section") as Element)
                      .getPropertyValue("padding-top")
                  ) / 2,
              })
            }
          >
            <SvgIcon name={"arrow-decoration-bw"} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
