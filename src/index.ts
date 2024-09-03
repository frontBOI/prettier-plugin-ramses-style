import babelParsers from 'prettier/parser-babel'

import typescriptParsers from 'prettier/parser-typescript'
import { preprocessor } from './preprocessor.js'

export default {
  parsers: {
    babel: {
      ...babelParsers.parsers.babel,
      preprocess: preprocessor,
    },
    typescript: {
      ...typescriptParsers.parsers.typescript,
      preprocess: preprocessor,
    },
  },
}
