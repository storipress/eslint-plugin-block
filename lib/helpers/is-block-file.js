const path = require('path')

exports.isBlockFile = function isBlockFile(context) {
  const filenameWithExtension = context.getPhysicalFilename()

  if (filenameWithExtension === '<input>' || filenameWithExtension === '<text>') {
    return false
  }

  const parentDirectory = path.basename(path.dirname(filenameWithExtension))

  return parentDirectory === 'block'
}
