const fs = require("fs")

const {askQuestion, askCheckbox, askPassword} = require("../utils/question")
const {decryptLogin, encryptLogin} = require("../utils/encryptAndDecrypt/encryptOrDecryptLogin")
const askForNewPassword = require("../utils/functions/askForNewPassword")

async function updateLoginByName(inputFilePath, inputPassword){
  // Get the object input file
  const inputFile = JSON.parse(fs.readFileSync(inputFilePath))
  // Ask for login name
  const loginName = await askQuestion("Login's name: ")
  // Go through each of the logins
  for(let i = 0; i < inputFile.length; i++){
    const encryptedLogin = inputFile[i]
    let login = decryptLogin(encryptedLogin, inputPassword)
    // If the login is the correct one
    if(login.name.includes(loginName)){
      console.log()
      console.log(login)
      console.log()
      // Ask is they want to change the name, username, and/or password
      const changes = await askCheckbox("What would you like to update: ", ["name", "username", "password"])
      // If the name wants to be updated
      if(changes.includes("name")){
        const newName = await askQuestion("Login's new name: ")
        login.name = newName
      }
      // If the username wants to be updated
      if(changes.includes("username")){
        const newUsername = await askQuestion("Login's new username: ")
        login.username = newUsername
      }
      // If the password wants to be updated
      if(changes.includes("password")){
        const newPassword = await askForNewPassword()
        login.password = newPassword
      }
      // Encrypt the new login
      const newEncryptedLogin = encryptLogin(login, inputPassword)
      // Update inputFile
      inputFile[i] = newEncryptedLogin
      // Write inputFile to file
      fs.writeFileSync(inputFilePath, JSON.stringify(inputFile, null, 2))
      return
    }
  }

  console.log()
  console.log("There was no login with that name. Please try again.")
  console.log()
}

module.exports = updateLoginByName