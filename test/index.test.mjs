import fs from 'fs'
import path from 'path'
import prettier from 'prettier'
import { expect, test, beforeAll } from '@jest/globals'
import { execSync } from 'child_process'

const fixturesDir = './test/fixtures'
const files = fs.readdirSync(path.resolve(fixturesDir))

// il faut convertir les fichiers typescript avant de lancer les tests
beforeAll(async () => {
  try {
    execSync('npm run build')
  } catch (e) {
    console.error(e)
  }
})

// détection automatique des fichiers pour testing simplifié
for (const sourceFileName of files) {
  if (/\.prettified\./.test(sourceFileName)) {
    continue
  }

  test(`Pretty "${sourceFileName}"`, async () => {
    const formattedFileName = sourceFileName.replace(/(\.[a-z]+)$/, '.prettified$1')
    const sourceFilePath = path.resolve(fixturesDir, sourceFileName)
    const formattedFilePath = path.resolve(fixturesDir, formattedFileName)

    const sourceText = fs.readFileSync(sourceFilePath, 'utf8')
    const expectedFormattedText = fs.readFileSync(formattedFilePath, 'utf8')

    const actualResult = await prettier.format(sourceText, {
      filepath: sourceFilePath,
      plugins: ['./dist/index.js'],
      singleQuote: true,
      semi: false,
      printWidth: 120,
    })

    expect(actualResult).toBe(expectedFormattedText)
  })
}
