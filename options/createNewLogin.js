const fs = require("fs")

const { askQuestion } = require("../utils/question")
const getUUID = require("../utils/getUUID")
const {encryptLogin} = require("../utils/encryptAndDecrypt/encryptOrDecryptLogin")
const askForNewPassword = require("../utils/functions/askForNewPassword")

async function createNewLogin(inputFilePath, inputPassword){
  // Get the object input file
  const inputFile = JSON.parse(fs.readFileSync(inputFilePath))
  // Ask for login's name
  const name = await askQuestion("Login's name: ")
  // Ask for login's username
  const username = await askQuestion("Login's username: ")
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