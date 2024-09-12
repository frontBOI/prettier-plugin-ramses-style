import { ArrayExpression, JSXAttribute, ObjectProperty, isSpreadElement } from '@babel/types'
import { HandledNodeType, debugAST, debugNodes } from './utils'

const generate = require('@babel/generator').default
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default

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
 * Permet de calculer le nombre de lignes d'un nœud.
 * @param node le noeud dont on veut calculer le nombre de lignes
 * @returns le nombre de lignes
 */
function getNodeNbLines(node: any) {
  return node.loc.end.line - node.loc.start.line
}

/**
 * Permet de calculer la taille d'une propriété d'un objet selon son type: en règle générale on prendra la taille du nom et de la valeur associés, mais parfois
 * on ne prendra que la taille du nom (si la valeur est une référence à une variable par exemple).
 * @param property la propriété dont on veut calculer la taille
 * @returns la taille de la propriété
 * @throws si le type de propriété n'est pas géré
 */
function computePropertyLength(property: HandledNodeType) {
  function getLength(start?: number | null, end?: number | null) {
    return Math.abs((end || 0) - (start || 0))
  }

  switch (property.type) {
    case 'JSXAttribute':
      return getLength(property.name.start, property.name.end) + getLength(property.value?.start, property.value?.end)

    case 'Identifier':
    case 'StringLiteral':
    case 'NumericLiteral':
      return getLength(property.start, property.end)

    case 'ArrayExpression':
      return getLength(property.start, property.end)

    case 'ObjectProperty':
      // les fonctions sont reclassées en dernières, et elles sont triées entre elles selon le nombre de lignes qu'elles occupent
      if (property.value.type === 'ArrowFunctionExpression') {
        const nbLines = getLength(property.loc?.start.line, property.loc?.end.line)
        if (nbLines === 0) {
          return (
            1000 + getLength(property.key.start, property.key.end) + getLength(property.value.start, property.value.end)
          )
        } else if (nbLines <= 2) {
          // @ts-ignore
          const lineLength = getLength(property.value.body.body[0].start, property.value.body.body[0].end)
          return 1500 + lineLength
        } else {
          return 2000 + nbLines
        }
      } else {
        const fieldNameLength = getLength(property.key.start, property.key.end)
        const valueLength = getLength(property.value.start, property.value.end)

        // si on référence une variable par son nom, on ne compte qu'une fois le nom
        if (
          property.key.type === 'Identifier' &&
          property.value.type === 'Identifier' &&
          property.key.name === property.value.name
        ) {
          return fieldNameLength
        } else {
          return fieldNameLength + valueLength
        }
      }

    default:
      throw `Impossible de calculer la taille de la propriété "${(property as any).type}"`
  }
}

/**
 * Permet de mettre à jour la loc d'un nœud et de ses enfants.
 * @param node le nœud dont on veut mettre à jour la loc
 * @param startLine nouvelle ligne de début
 * @param endLine nouvelle ligne de fin
 */
function updateNodeLoc(node: any, startLine: number, endLine: number) {
  // update node ------------------------------------
  node.loc.start.line = startLine
  node.loc.end.line = endLine

  // update key -------------------------------------
  if (node.key?.loc) {
    node.key.loc.start.line = startLine
    node.key.loc.end.line = endLine
  }

  // update value -----------------------------------
  if (node.value?.loc) {
    node.value.loc.start.line = startLine
    node.value.loc.end.line = endLine
  }
}

/**
 * Il se trouve que Babel parse le javascript en partant du principe qu'un commentaire sur la même ligne qu'une ligne de code appartient en fait à la ligne de code suivante en tant que
 * trailingComment.
 * Cette fonction a pour but de corriger ce problème d'interprétation en déplaçant les commentaires de fin de ligne dans les commentaires de fin de la ligne de code précédente.
 * @param nodes les noeuds à traiter
 */
function correctEndLineComments(nodes: any[]) {
  for (let i = 1; i < nodes.length; i++) {
    const currentNode = nodes[i]
    const previousNode = nodes[i - 1]
    const hasABeforeCommentOnPreviousCodeLine =
      currentNode.leadingComments?.[0].loc.start.line === previousNode.loc.start.line

    if (hasABeforeCommentOnPreviousCodeLine) {
      const comment = {
        ...currentNode.leadingComments[0],
        isOnSameLine: true,
      }
      comment.loc.start.line = previousNode.loc.end.line
      comment.loc.end.line = previousNode.loc.end.line

      // réassignation du commentaire au noeud précédent
      if (!previousNode.trailingComments) {
        previousNode.trailingComments = []
      }
      previousNode.trailingComments.push(comment)

      if (currentNode.leadingComments.length === 1) {
        delete currentNode.leadingComments
      } else {
        currentNode.leadingComments.shift()
      }

      syncCommentsLocation(previousNode)
      syncCommentsLocation(currentNode)
    }
  }
}

/**
 * Synchronise les numéros de ligne des commentaires d'un nœud par rapport à la ligne courante de ce nœud.
 * @param node le nœud dont on souhaite mettre à jour les commentaires
 */
function syncCommentsLocation(node: any) {
  const nbCommentsBefore = node.leadingComments?.length
  const nbCommentsAfter = node.trailingComments?.length

  if (nbCommentsBefore > 0) {
    // leading comments terminent à la ligne précédente
    let startIndex = node.loc.start.line - nbCommentsBefore
    for (let j = 0; j < nbCommentsBefore; j++) {
      const comment = node.leadingComments[j]
      const commentNbLines = getNodeNbLines(comment)
      comment.loc.start.line = startIndex + j
      comment.loc.end.line = startIndex + j + commentNbLines
    }
  }

  if (nbCommentsAfter > 0) {
    // trailings commments commencent à la ligne courante
    const startIndex = node.trailingComments[0].isOnSameLine ? 0 : 1
    for (let j = 0; j < nbCommentsAfter; j++) {
      const comment = node.trailingComments[j]
      const commentNbLines = getNodeNbLines(comment)
      comment.loc.start.line = node.loc.end.line + j + startIndex
      comment.loc.end.line = node.loc.end.line + j + startIndex + commentNbLines
    }
  }
}

/**
 * Cette fonction permet de mettre à jour les numéros de ligne d'une liste de nœuds après un tri: en effet, pour que Prettier réagisse correctement il que l'AST soit fidèle à la réalité.
 * Alors il devient nécessaire de mettre à jour les numéros de ligne des nœuds après un tri, et pas seulement celui du nœud lui-même mais aussi de ses enfants.
 * @param nodes la liste des nœuds à mettre à jour
 * @param initialNode nœud de référence pour la première position à prendre en compte
 */
function updateLoc(nodes: any[], initialNode: any) {
  const initialNodeRealLine = initialNode.loc.start.line - (initialNode.leadingComments?.length || 0) // la vraie ligne de début est celle sans les commentaires qui précèdent
  let newStartLine = initialNodeRealLine
  let previousNodeNbLines = -1

  for (const node of nodes) {
    const nodeNbLines = getNodeNbLines(node)
    const hasCommentOnSameLine =
      nodeNbLines === 0 && node.trailingComments && node.trailingComments[0].loc.start.line === node.loc.start.line

    newStartLine += previousNodeNbLines + 1
    previousNodeNbLines = nodeNbLines
    const newEndLine = newStartLine + nodeNbLines

    updateNodeLoc(node, newStartLine, newEndLine)

    // on garde l'éventuel commentaire de fin de ligne
    if (hasCommentOnSameLine) {
      node.trailingComments[0].loc.start.line = newEndLine
      node.trailingComments[0].loc.end.line = newEndLine
    }

    syncCommentsLocation(node)
  }
}

/**
 * Cette fonction permet de mettre à jour les numéros de ligne de chaque nœud avec commentaire: il faut éventuellement déplacer les nœud qui précèdent ou qui suivent un commentaire.
 * @param nodes tous les nœuds à mettre à jour
 */
function updateLocWithComments(nodes: any[]) {
  for (let i = 0; i < nodes.length; i++) {
    const nbCommentsBefore = nodes[i].leadingComments?.length
    const nbCommentsAfter = nodes[i].trailingComments?.length

    // si un noeud a des commentaires avant, il faut mettre à jour les lignes de ce noeud et de tous les noeuds suivants
    if (nbCommentsBefore > 0) {
      for (let j = i; j < nodes.length; j++) {
        const currentNode = nodes[j]
        const newFirstLine = currentNode.loc.start.line + nbCommentsBefore
        const newLastLine = currentNode.loc.end.line + nbCommentsBefore
        updateNodeLoc(currentNode, newFirstLine, newLastLine)
        syncCommentsLocation(currentNode)
      }
    }

    // si un noeu a des commentaires après, il faut mettre à jour les lignes uniquement des noeuds suivants
    if (nbCommentsAfter > 0) {
      for (let j = i + 1; j < nodes.length; j++) {
        const currentNode = nodes[j]
        const newFirstLine = currentNode.loc.start.line + nbCommentsAfter
        const newLastLine = currentNode.loc.end.line + nbCommentsAfter
        updateNodeLoc(currentNode, newFirstLine, newLastLine)
        syncCommentsLocation(currentNode)
      }
    }
  }
}

/**
 * Permet de trier les propriétés d'un arbre AST par ordre de longueur croissante.
 * @param unsortedElements les nœuds AST à trier
 * @returns les nœuds triés
 */
function sortProperties(unsortedElements: HandledNodeType[]) {
  correctEndLineComments(unsortedElements)

  // sauvegarde de l'index des spread elements pour les remettre à la même place ensuite
  const spreadElements: Record<string, HandledNodeType> = {}
  for (let i = 0; i < unsortedElements.length; i++) {
    const currentObject = unsortedElements[i]
    if (isSpreadElement(currentObject)) {
      spreadElements[i] = currentObject
    }
  }

  // tri par longueur croissante
  const sortedElements = JSON.parse(
    JSON.stringify(unsortedElements.filter(e => !Object.values(spreadElements).includes(e)).sort(sortByLength)),
  )

  updateLoc(sortedElements, unsortedElements[0])
  // debugNodes(sortedElements)
  updateLocWithComments(sortedElements)
  // debugNodes(sortedElements)

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
  console.log(``)
  const ast = babelParser.parse(code, {
    plugins: ['jsx', 'typescript'],
    sourceType: 'module',
  })

  traverse(ast, {
    // éléments d'un objet (ex: déclaration de variable, retour de fonction)
    ObjectExpression(path: any) {
      const sortedElements = sortProperties(path.node.properties as ObjectProperty[])
      path.node.properties = sortedElements
    },

    // destructuration d'objet
    ObjectPattern(path: any) {
      const sortedElements = sortProperties(path.node.properties as ObjectProperty[])
      path.node.properties = sortedElements
    },

    // les éléments d'un tableau
    ArrayExpression(path: any) {
      const sortedElements = sortProperties(path.node.elements as ArrayExpression[])
      path.node.elements = sortedElements
    },

    // JSX props
    JSXOpeningElement(path: any) {
      const sortedAttributes = sortProperties(path.node.attributes as JSXAttribute[])
      path.node.attributes = sortedAttributes
    },
  })

  debugAST(ast)

  const newCode = generate(ast, {
    retainLines: true,
  }).code

  // DONE: ajouter gestion du spread operator
  // DONE: bien gérer les commentaires
  // DONE: gérer une map (mondial relay -> api_v1/lib/rules)
  // DONE: gérer le problème de suppression des retours à la ligne... (retainLines à true mais ça fait bugger)
  // DONE un espace est inséré après un commentaire bloc
  // TODO: les types Typescript disparaissent après le traitement (mondial relay -> api_v1/index)
  // TODO: les interfaces Typescript
  // TODO: désactiver le sorting sur les objets avec des indices (mondial relay -> api_v1/lib/statusCodes)
  // TODO: unknown type: "ChainExpression" (mondial relay -> parceShopSelector/index)

  return newCode
}
