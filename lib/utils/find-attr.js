exports.findDirectiveAttr = function findDirectiveAttr(node, name) {
  return node.startTag.attributes.find(
    (attr) => attr.directive && attr.key.name.name === 'bind' && attr.key.argument.name === name,
  )
}

exports.findLiteralAttr = function findLiteralAttr(node, name) {
  return node.startTag.attributes.find((attr) => !attr.directive && attr.key.name === name)
}
