import * as fs from "fs"
import * as path from "path"
import * as sassTrue from "sass-true"

import { describe, it } from "vitest"

const getTestFiles = (dir: string): string[] => {
  const files = fs.readdirSync(dir)
  const testFileRegex = /\.test\.scss|\.spec\.scss$/

  let testFiles: string[] = []

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      testFiles = testFiles.concat(getTestFiles(filePath))
    } else if (testFileRegex.test(file)) {
      testFiles.push(filePath)
    }
  })

  return testFiles
}

describe("Scss", () => {
  const testFiles: string[] = getTestFiles(process.cwd())
  testFiles.forEach(scssFile => sassTrue.runSass({ describe, it }, scssFile))
})
