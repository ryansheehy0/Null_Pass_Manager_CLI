const fs = require("fs")

const {askQuestion, askCheckbox} = require("../utils/question")
const {encryptLogin} = require("../utils/encryptAndDecrypt/encryptOrDecryptLogin")
const askForNewPassword = require("../utils/functions/askForNewPassword")

const loginByName = require("../utils/functions/loginByName")

async function updateLoginByName(inputFilePath, inputPassword){
  await loginByName(inputFilePath, inputPassword, async (login) => {
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
  })
}

module.exports = updateLoginByName