import { render } from "@testing-library/react"
import React from "react"
import { describe, expect, it } from "vitest"

import App from "../App"

describe("App", () => {
  it("should see the welcome message", () => {
    const { getByText } = render(<App />)
    expect(getByText("Hey from Bearded Dudes!")).toBeInTheDocument()
  })
})
