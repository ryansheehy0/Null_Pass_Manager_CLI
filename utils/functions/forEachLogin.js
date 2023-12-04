const fs = require("fs")

const {decryptLogin} = require("../encryptAndDecrypt/encryptOrDecryptLogin")

async function forEachLogin(inputFilePath, inputPassword, loginFunction){
  // Get the object input file
  const inputFile = JSON.parse(fs.readFileSync(inputFilePath))
  // Go through each of the logins
  for(let i = 0; i < inputFile.length; i++){
    const encryptedLogin = inputFile[i]
    const login = decryptLogin(encryptedLogin, inputPassword)
    await loginFunction({...login}, [...inputFile], i)
  }
}

module.exports = forEachLogin