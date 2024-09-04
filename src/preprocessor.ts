import {
  ObjectProperty,
  JSXAttribute,
  isSpreadElement,
  ArrayExpression,
  StringLiteral,
  NumericLiteral,
} from '@babel/types'
const generate = require('@babel/generator').default
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default

type HandledNodeType = ObjectProperty | JSXAttribute | ArrayExpression | StringLiteral | NumericLiteral

/**
 * Permet de calculer la taille d'une propriété d'un objet, en comptant la taille de son nom et celle de sa valeur
 * @param property la propriété dont on veut calculer la taille
 * @returns la taille de la propriété ou 0 si on n'y arrive pas
 */
function computePropertyLength(property: HandledNodeType) {
  let retval = 0

  if (property.type === 'JSXAttribute') {
    const fieldNameLength = Math.abs((property.name.end || 0) - (property.name.start || 0))
    const valueLength = Math.abs((property.value?.end || 0) - (property.value?.start || 0))

    return fieldNameLength + valueLength
  }

  // une chaîne de caractères
  else if (property.type === 'StringLiteral' || property.type === 'NumericLiteral') {
    retval = Math.abs((property.end || 0) - (property.start || 0))
  }

  // éléments d'un tableau
  else if (property.type === 'ArrayExpression') {
    const valueLength = Math.abs((property.end || 0) - (property.start || 0))
    retval = valueLength
  }

  // les fonctions sont reclassées en dernières, et elles sont triées entre elles selon le nombre de lignes qu'elles occupent
  else if (property.value.type === 'ArrowFunctionExpression') {
    const nbLines = Math.abs((property.loc?.end.line || 0) - (property.loc?.start.line || 0))
    retval = 1000 + nbLines
  } else {
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
function sortByLength(a: HandledNodeType, b: HandledNodeType) {
  return computePropertyLength(a) - computePropertyLength(b)
}

/**
 * Permet de trier les propriétés d'un arbre AST par ordre de longueur croissante.
 * @param properties les nœuds AST à trier
 * @returns les nœuds triés
 */
function sortProperties(properties: HandledNodeType[]) {
  // sauvegarde de l'index des spread elements pour les remettre à la même place ensuite
  const spreadElements: Record<string, ObjectProperty> | Record<string, JSXAttribute> = {}
  for (let i = 0; i < properties.length; i++) {
    const currentObject = properties[i]
    if (isSpreadElement(currentObject)) {
      spreadElements[i] = currentObject
    }
  }

  // tri par longueur croissante
  const sortedElements = properties.filter(e => !Object.values(spreadElements).includes(e)).sort(sortByLength)

  // réinsertion des spread elements à leur place
  for (const [index, node] of Object.entries(spreadElements)) {
    sortedElements.splice(+index, 0, node)
  }

  return sortedElements
}

/**
 * Fonction permettant de d'améliorer la syntaxe d'un code en triant des champs répartis ligne par ligne par ordre de longueur croissante:
 * cela signifie que les champs les plus courts seront placés en premier (le nom et la valeur de la propriété sont tous deux pris en compte).
 * Les champs concernés sont les suivants:
 * - les champs d'un objet (destructuration, retour de fonction)
 * - les paramètres d'une fonction
 * - les éléments d'un tableau
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
    ObjectExpression(path: any) {
      const objectElements = path.node.properties as ObjectProperty[]
      const sortedElements = sortProperties(objectElements)
      path.node.properties = sortedElements
    },

    // destructuration d'objet
    ObjectPattern(path: any) {
      const objectElements = path.node.properties as ObjectProperty[]
      const sortedElements = sortProperties(objectElements)
      path.node.properties = sortedElements
    },

    // les éléments d'un tableau
    ArrayExpression(path: any) {
      const objectElements = path.node.elements as ArrayExpression[]
      const sortedElements = sortProperties(objectElements)
      path.node.elements = sortedElements
    },

    // JSX props
    JSXOpeningElement(path: any) {
      const jsxAttributes = path.node.attributes as JSXAttribute[]
      const sortedAttributes = sortProperties(jsxAttributes)
      path.node.attributes = sortedAttributes
    },
  })

  const newCode = generate(ast, {
    retainLines: false,
  }).code

  // DONE: ajouter gestion du spread operator
  // DONE: bien gérer les commentaires
  // TODO: les types Typescript disparaissent après le traitement !
  // DONE: gérer une map (mondial relay -> api_v1/lib/rules)

  return newCode
}
