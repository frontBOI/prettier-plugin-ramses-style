import { ArrayExpression, JSXAttribute, NumericLiteral, ObjectProperty, StringLiteral, Identifier } from '@babel/types'

const traverse = require('@babel/traverse').default

export type HandledNodeType =
  | ObjectProperty
  | JSXAttribute
  | ArrayExpression
  | StringLiteral
  | NumericLiteral
  | Identifier

/**
 * Permet de visualiser simplement une propriété et afficher les informations importantes pour ce projet
 * @param property la propriété
 */
export function debugObjectProperty(property: ObjectProperty) {
  if (property.key.type === 'Identifier') {
    if (property.value.type === 'ArrowFunctionExpression') {
      console.log(`${property.key.type} | ${property.value.type}`)
    } else if (property.value.type === 'NumericLiteral') {
      const fieldNameLength = Math.abs((property.key.end || 0) - (property.key.start || 0))
      const valueLength = Math.abs((property.value.end || 0) - (property.value.start || 0))
      console.log(
        `${property.key.type} "${property.key.name}" (length: ${fieldNameLength}) | ${property.value.type} "${property.value.value}" (length: ${valueLength})`,
      )
    } else if (property.value.type === 'ArrayExpression') {
      const fieldNameLength = Math.abs((property.key.end || 0) - (property.key.start || 0))
      const valueLength = Math.abs((property.value.end || 0) - (property.value.start || 0))
      console.log(
        `${property.key.type} "${property.key.name}" (length: ${fieldNameLength}) | ${property.value.type} "${property.value.elements}" (length: ${valueLength})`,
      )
    }
  }
}

/**
 * Permet de visualiser simplement une propriété JSX et afficher les informations importantes pour ce projet
 * @param attribute l'attribut
 */
export function debugJSXAttribute(attribute: JSXAttribute) {
  if (attribute.value?.type === 'JSXExpressionContainer') {
    if (attribute.value?.expression.type === 'MemberExpression') {
      console.log(
        `"${attribute.name.name}" = "${attribute.value?.expression.property}" (${attribute.value?.expression.type})`,
      )
    } else {
      console.log(`"${attribute.name.name}" = "${attribute.value?.expression}" (${attribute.value?.expression.type})`)
    }
  } else if (attribute.value?.type === 'StringLiteral') {
    console.log(`"${attribute.name.name}" = "${attribute.value?.value}" (${attribute.value.type})`)
  } else if (!attribute.value) {
    console.log(`"${attribute.name.name}" = "${attribute.value}"`)
  }
}

/**
 * Permet de visualiser un AST de manière simple.
 * @param ast l'AST à parcourir
 */
export function debugAST(ast) {
  let depth = 0
  traverse(ast, {
    enter(path) {
      depth++
      let tab = '   '
      let tabs = tab.repeat(depth)

      const node = path.node
      let name
      switch (node.type) {
        case 'VariableDeclarator':
          name = node.id.name
          break

        case 'ObjectExpression':
          name = 'no name'
          break

        case 'Identifier':
          name = node.name
          break

        case 'ObjectProperty':
          name = node.key.name
          break
      }

      console.log(`${tabs}"${name}" (${node.type}) l.${node.loc.start.line} to l.${node.loc.end.line}`)
      if (node.leadingComments || node.trailingComments) {
        console.log(`${tabs}${tab}comments:`)
        if (node.leadingComments) {
          console.log(`${tabs}${tab}${tab}${node.leadingComments.length} leading comments:`)
          for (let i = 0; i < (node.leadingComments?.length || 0); i++) {
            console.log(
              `${tabs}${tab}${tab}${tab}// ${node.leadingComments[i].value} (l.${node.leadingComments[i].loc.start.line})`,
            )
          }
        }
        if (node.trailingComments) {
          console.log(`${tabs}${tab}${tab}${node.trailingComments.length} trailing comments:`)
          for (let i = 0; i < (node.trailingComments?.length || 0); i++) {
            console.log(
              `${tabs}${tab}${tab}${tab}// ${node.trailingComments[i].value} (l.${node.trailingComments[i].loc.start.line})`,
            )
          }
        }
      }
      console.log(``)
    },
    exit(path) {
      depth--
    },
  })
}

/**
 * Permet d'afficher des informations sur un tableau de nœuds
 * @param nodes les nœuds à parcourir
 */
export function debugNodes(nodes: any[]) {
  console.log(`============================ DEBUG NODES ============================`)
  for (const node of nodes) {
    console.log(`Nœud "${node.key?.name || 'pas de nom'}" (l.${node.loc.start.line} to l.${node.loc.end.line})`)
    if (node.leadingComments) {
      console.log(`\t${node.leadingComments.length} leading comments:`)
      for (const c of node.leadingComments) {
        console.log(`\t\t ${c.value} (l.${c.loc.start.line})`)
      }
    }
    if (node.trailingComments) {
      console.log(`\t${node.trailingComments.length} trailing comments:`)
      for (const c of node.trailingComments) {
        console.log(`\t\t ${c.value} (l.${c.loc.start.line})`)
      }
    }
    console.log(``)
  }
  console.log(`=====================================================================\n`)
}
