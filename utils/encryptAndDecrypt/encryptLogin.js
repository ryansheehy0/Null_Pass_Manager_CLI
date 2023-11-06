const encryptOrDecryptField = require("./encryptOrDecryptField")

function encryptLogin(password, {uuid, loginName, loginUsername, loginPassword}){
  let encryptedLogin = {uuid}

  encryptedLogin.name = encryptOrDecryptField(password, uuid, loginName, "name", true)
  encryptedLogin.username = encryptOrDecryptField(password, uuid, loginUsername, "username", true)
  encryptedLogin.password = encryptOrDecryptField(password, uuid, loginPassword, "password", true)

  return encryptedLogin
}

module.exports = encryptLogin