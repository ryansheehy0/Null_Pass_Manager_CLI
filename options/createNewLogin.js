const fs = require("fs")

const generateRandomPassword = require("./generateRandomPassword")
const { askQuestion, askYesOrNo, askPassword } = require("../utils/question")
const getUUID = require("../utils/getUUID")
const {encryptLogin} = require("../utils/encryptAndDecrypt/encryptOrDecryptLogin")

async function createNewLogin(inputFilePath, inputPassword){
  // Get the object input file
  const inputFile = JSON.parse(fs.readFileSync(inputFilePath))
  // Ask for login's name
  const name = await askQuestion("Login's name: ")
  // Ask for login's username
  const username = await askQuestion("Login's username: ")
  // Ask if the user wants a generated password
  let password
  const wantsPassword = await askYesOrNo("Generate random password: ")
  if(wantsPassword){
    password = await generateRandomPassword()
  }else{
    // Ask the user for their password
    let passwordConfirmed = false
    while(!passwordConfirmed){ // Ask for password if the password isn't confirmed
      password = await askPassword("Login's password: ")
      const reEnteredPassword = await askPassword("Please re-enter your password: ")
      if(password === reEnteredPassword){
        passwordConfirmed = true
      }else{
        console.log("Passwords do not match. Please try again.")
      }
    }
  }

  // Get a new uuid
  const uuid = getUUID(inputFile)

  // Create an encryptedLogin
  const encryptedLogin = encryptLogin({uuid, name, username, password}, inputPassword)

  // Concat the new encrypted login to the end of the inputFile
  inputFile.push(encryptedLogin)
  fs.writeFileSync(inputFilePath, JSON.stringify(inputFile, null, 2))
}

module.exports = createNewLogin