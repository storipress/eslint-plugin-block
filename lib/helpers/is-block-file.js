const path = require('path')

exports.TEST_BLOCK_FILE = '<block-testing>.vue'

exports.isBlockFile = function isBlockFile(context) {
  const filenameWithExtension = context.getPhysicalFilename()

  if (filenameWithExtension === '<input>' || filenameWithExtension === '<text>') {
    return false
  }

  if (filenameWithExtension === exports.TEST_BLOCK_FILE) {
    return true
  }

  const parentDirectory = path.basename(path.dirname(filenameWithExtension))

  return parentDirectory === 'block'
}
