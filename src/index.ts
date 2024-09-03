const { parsers } = require('prettier/parser-babel')

const typescriptParsers = require('prettier/parser-typescript')
const { preprocessor } = require('./preprocessor.js')

module.exports = {
  parsers: {
    babel: {
      ...parsers.babel,
      preprocess: preprocessor,
    },
    typescript: {
      ...typescriptParsers.parsers.typescript,
      preprocess: preprocessor,
    },
  },
}
