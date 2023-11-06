const sha256 = require("./sha256")
const simpleEncryption = require("./simpleEncryption")

function encryptOrDecryptField(password, uuid, fieldValue, fieldName, isEncryption){
  const sha256Field = sha256(password + uuid + fieldName)
  const paddedField = fieldValue.padStart(64 - fieldValue.length, " ")
  return simpleEncryption(paddedField, sha256Field, isEncryption)
}

module.exports = encryptOrDecryptField