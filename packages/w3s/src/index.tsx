import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'

import App from './App'
import InternalServerError from './containers/errors/InternalServerError/InternalServerError'
import SmoothScroll from './SmoothScroll'

import './index.scss'

const rootElement = document.querySelector("#root") as HTMLElement
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={InternalServerError}>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </ErrorBoundary>
  </StrictMode>
)
