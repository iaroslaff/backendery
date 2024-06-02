import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import SmoothScroll from "./SmoothScroll"

import "./index.scss"

const rootElement = document.querySelector("#root") as HTMLElement
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>
)
