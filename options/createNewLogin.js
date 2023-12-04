const fs = require("fs")

const { askQuestion } = require("../utils/question")
const getUUID = require("../utils/getUUID")
const {encryptLogin} = require("../utils/encryptAndDecrypt/encryptOrDecryptLogin")
const askForNewPassword = require("../utils/functions/askForNewPassword")

async function createNewLogin(inputFilePath, inputPassword){
  // Get the object input file
  const inputFile = JSON.parse(fs.readFileSync(inputFilePath))
  // Ask for login's name
  let name
  while(true){
    name = await askQuestion("Login's name: (max 64)")
    if(name.length > 64){
      console.log("The max length the login's name can be is 64 characters. Please try again.")
      continue
    }
    break
  }
  // Ask for login's username
  let username
  while(true){
    username = await askQuestion("Login's username: (max 64)")
    if(username.length > 64){
      console.log("The max length the login's username can be is 64 characters. Please try again.")
      continue
    }
    break
  }
  // Ask if the user wants a generated password
  const password = await askForNewPassword()
  // Get a new uuid
  const uuid = getUUID(inputFile)
  // Create an encryptedLogin
  const encryptedLogin = encryptLogin({uuid, name, username, password}, inputPassword)
  // Concat the new encrypted login to the end of the inputFile
  inputFile.push(encryptedLogin)
  fs.writeFileSync(inputFilePath, JSON.stringify(inputFile, null, 2))
}

module.exports = createNewLogin