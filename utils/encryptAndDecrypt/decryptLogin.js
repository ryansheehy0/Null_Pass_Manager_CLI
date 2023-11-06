const encryptOrDecryptField = require("./encryptOrDecryptField")

function decryptLogin(password, {uuid, encryptedLoginName, encryptedLoginUsername, encryptedLoginPassword}){
  let decryptedLogin = {uuid}

  decryptedLogin.name = encryptOrDecryptField(password, uuid, encryptedLoginName, "name", false)
  decryptedLogin.username = encryptOrDecryptField(password, uuid, encryptedLoginUsername, "username", false)
  decryptedLogin.password = encryptOrDecryptField(password, uuid, encryptedLoginPassword, "password", false)

  return decryptedLogin
}

module.exports = decryptLogin