exports.insertProp = function (fixer, node, prop) {
  // start of element + name length + left angle
  const pos = node.startTag.range[0] + node.rawName.length + 1
  return fixer.insertTextAfterRange([pos, pos], ` ${prop}`)
}
