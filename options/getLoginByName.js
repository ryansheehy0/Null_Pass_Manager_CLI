const fs = require("fs")

const {askQuestion} = require("../utils/question")
const {decryptLogin} = require("../utils/encryptAndDecrypt/encryptOrDecryptLogin")

async function getLoginByName(inputFilePath, inputPassword){
  // Get the object input file
  const inputFile = JSON.parse(fs.readFileSync(inputFilePath))
  // Ask for login name
  const loginName = await askQuestion("Login's name: ")
  // Go through each of the logins
  for(let i = 0; i < inputFile.length; i++){
    const encryptedLogin = inputFile[i]
    // Decrypt each login and check if the name matches
    const login = decryptLogin(encryptedLogin, inputPassword)
    if(login.name.includes(loginName)){
      console.log()
      console.log(login)
      console.log()
      break
    }
  }
}

module.exports = getLoginByName