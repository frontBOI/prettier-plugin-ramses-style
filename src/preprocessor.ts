import _generate from '@babel/generator'
import babelParser from '@babel/parser'
import _traverse from '@babel/traverse'
import { JSXAttribute, ObjectProperty } from '@babel/types'

const traverse = _traverse.default
const generate = _generate.default

/**
 * Permet de calculer la taille d'une propriété d'un objet, en comptant la taille de son nom et celle de sa valeur
 * @param property la propriété dont on veut calculer la taille
 * @returns la taille de la propriété ou 0 si on n'y arrive pas
 */
function computePropertyLength(property: ObjectProperty | JSXAttribute) {
  let retval = 0

  if (property.type === 'JSXAttribute') {
    const fieldNameLength = Math.abs((property.name.end || 0) - (property.name.start || 0))
    const valueLength = Math.abs((property.value?.end || 0) - (property.value?.start || 0))

    return fieldNameLength + valueLength
  }

  // les fonctions sont reclassées en dernières, et elles sont triées entre elles selon le nombre de lignes qu'elles occupent
  else if (property.value.type === 'ArrowFunctionExpression') {
    const nbLines = Math.abs((property.loc?.end.line || 0) - (property.loc?.start.line || 0))
    retval = 1000 + nbLines
  } 
  
  else {
    const fieldNameLength = Math.abs((property.key.end || 0) - (property.key.start || 0))
    const valueLength = Math.abs((property.value.end || 0) - (property.value.start || 0))
    retval = fieldNameLength + valueLength
  }

  return retval
}

/**
 * Fonction permettant de trier des éléments du plus court au plus long.
 * @param a le premier champ à comparer
 * @param b le second champ à comparer
 * @returns l'ordre de tri
 */
function sortByLength(a: ObjectProperty, b: ObjectProperty) {
  if (a.key.type === 'Identifier' && b.key.type === 'Identifier') {
    return computePropertyLength(a) - computePropertyLength(b)
  }

  return 0
}

/**
 * Fonction permettant de trier des props JSXX de la plus courte à la plus longue.
 * @param a la première props JSX à comparer
 * @param b la seconde props JSX à comparer
 * @returns l'ordre de tri
 */
function sortByJSXLength(a: JSXAttribute, b: JSXAttribute) {
  if (a.name.type === 'JSXIdentifier' && b.name.type === 'JSXIdentifier') {
    return computePropertyLength(a) - computePropertyLength(b)
  }

  return 0
}

/**
 * Fonction permettant de d'améliorer la syntaxe d'un code en triant des champs répartis ligne par ligne par ordre de longueur croissante:
 * cela signifie que les champs les plus courts seront placés en premier (le nom et la valeur de la propriété sont tous deux pris en compte).
 * Les champs concernés sont les suivants:
 * - les champs d'un objet (destructuration, retour de fonction)
 * - les paramètres d'une fonction
 * @param code le code à traiter
 * @param options options passées à Prettier
 * @returns le code modifié
 */
export function preprocessor(code: string, options: any) {
  const ast = babelParser.parse(code, {
    plugins: ['jsx', 'typescript'],
    sourceType: 'module',
  })

  traverse(ast, {
    // éléments d'un objet (ex: déclaration de variable, retour de fonction)
    ObjectExpression(path) {
      const objectElements = path.node.properties as ObjectProperty[]
      const sortedElements = objectElements.sort(sortByLength)
      path.node.properties = sortedElements
    },

    // destructuration d'objet
    ObjectPattern(path) {
      const objectElements = path.node.properties as ObjectProperty[]
      const sortedElements = objectElements.sort(sortByLength)
      path.node.properties = sortedElements
    },

    // JSX props
    JSXOpeningElement(path) {
      const jsxAttributes = path.node.attributes as JSXAttribute[]
      const sortedAttributes = jsxAttributes.sort(sortByJSXLength)
      path.node.attributes = sortedAttributes
    },
  })

  let newCode = generate(ast, {
    retainLines: true,
  }).code

  // la manipulation de l'ordre des éléments introduit des espaces en trop et cela sera mal compris par Prettier
  newCode = newCode.replace(/,(\n)+/g, ',')

  return newCode
}
