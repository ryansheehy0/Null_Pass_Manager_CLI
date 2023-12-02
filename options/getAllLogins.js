const fs = require("fs")
const {decryptLogin} = require("../utils/encryptAndDecrypt/encryptOrDecryptLogin")

function getAllLogins(inputFilePath, inputPassword){
  // Get the object input file
  const inputFile = JSON.parse(fs.readFileSync(inputFilePath))
  // Go through each of the logins
  let outputFile = []
  for(let i = 0; i < inputFile.length; i++){
    const login = inputFile[i]
    // Decrypt each login and add to outputFile
    outputFile.push(decryptLogin(login, inputPassword))
  }
  // Print outputFile
  console.log()
  console.log(outputFile)
  console.log()
}

module.exports = getAllLogins