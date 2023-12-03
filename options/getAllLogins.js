const fs = require("fs")

const {decryptLogin} = require("../utils/encryptAndDecrypt/encryptOrDecryptLogin")

function getAllLogins(inputFilePath, inputPassword, justNames){
  // Get the object input file
  const inputFile = JSON.parse(fs.readFileSync(inputFilePath))
  // Go through each of the logins
  let outputFile = []
  for(let i = 0; i < inputFile.length; i++){
    const encryptedLogin = inputFile[i]
    // Decrypt each login
    const login = decryptLogin(encryptedLogin, inputPassword)
    // Add to output file
    if(justNames){
      outputFile.push(login.name)
    }else{
      outputFile.push(login)
    }
  }
  // Print outputFile
  console.log()
  console.log(outputFile)
  console.log()
}

module.exports = getAllLogins