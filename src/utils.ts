import { JSXAttribute, ObjectProperty } from '@babel/types'

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
