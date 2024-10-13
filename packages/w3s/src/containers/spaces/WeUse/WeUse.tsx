import { FC, ReactNode, useRef } from "react"

import { useBreakpoints } from "../../../hooks/useBreakpoints"

import "./WeUse.scss"

/** types */
type CardContent = Record<string, ReactNode>

const WeUse: FC = () => {

  /** hooks */
  const { isSmartphone, isSmallDevice } = useBreakpoints()

  const content: CardContent[] = [
    {
      html: (
        <div className='section'>
          <h2>Заголовок 1</h2>
          <p>Описание для секции 1</p>
          <ul>
            <li>Элемент списка 1</li>
            <li>Элемент списка 2</li>
          </ul>
        </div>
      ),
    },
    {
      html: (
        <div className='section'>
          <h2>Заголовок 2</h2>
          <p>Описание для секции 2</p>
        </div>
      ),
    },
  ]

  return (
    <div className='we-use'>
      <h2 className="we-use__title">We Use_</h2>
      <div className="we-use__random-symbols">{'[*&&/]'}</div>
      <div className="we-use__decorative-square"></div>

      <div className="we-use__tabs-group">
        <button className="we-use__tab">Languages</button>
        <button className="we-use__tab">Frameworks</button>
        <button className="we-use__tab">Documentation</button>
        <button className="we-use__tab">Containerization</button>
        <button className="we-use__tab">Database</button>
        <button className="we-use__tab">Message queues</button>
        <button className="we-use__tab">Testing</button>
      </div>

      <div className="we-use__stack-adaptive">
        <h3 className="we-use__stack-title">Frameworks</h3>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Kubernetes
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...GitLab
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...GitKraken
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...New Relic
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Datadog
        </p>
      </div>

      <div className="we-use__stack">
        <h3 className="we-use__stack-title">Languages</h3>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Python
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Rust
        </p>
      </div>

      <div className="we-use__stack">
        <h3 className="we-use__stack-title">Frameworks</h3>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Kubernetes
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...GitLab
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...GitKraken
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...New Relic
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Datadog
        </p>
      </div>

      <div className="we-use__stack">
        <h3 className="we-use__stack-title">Database</h3>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Back4App 
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Stack Overflow
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Postman API
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Firebase
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Apache
        </p>
      </div>

      <div className="we-use__stack">
        <h3 className="we-use__stack-title">Message queues</h3>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...GitHub
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Stack Overflow
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Docker
        </p>
      </div>

      <div className="we-use__stack">
        <h3 className="we-use__stack-title">Documentation</h3>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Heroku
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Visual Studio
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Jira
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...GitHub
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Bitbucket
        </p>
      </div>

      <div className="we-use__stack">
        <h3 className="we-use__stack-title">Containerization</h3>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...NGINX
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Apache
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Back4App
        </p>
      </div>

      <div className="we-use__stack">
        <h3 className="we-use__stack-title">Testing</h3>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Kubernetes
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Docker
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...Pivotal Tracker
        </p>
        <p className="we-use__stack-tool">
          <span className="we-use__stack-tool--highlighter">{'>'}</span> ...GitHub
        </p>
      </div>

      <div className="we-use__decorative-rectangle"></div>

      <p className="we-use__description">
        We cover the full range of services for analysis, development
        and support of your online business
      </p>

    </div>
  )
}

export default WeUse
