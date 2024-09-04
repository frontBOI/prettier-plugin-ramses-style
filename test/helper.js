/**
 * Permet de nettoyer un code en retirant les lignes non désirées.
 * @param {string} code le code à nettoyer
 * @returns le code nettoyé
 */
function removeUnwantedLines(code) {
  return code
    .split('\n')
    .filter(line => !line.trim().startsWith('// @ts-ignore'))
    .join('\n')
}

module.exports = {
  removeUnwantedLines,
}
