const fs = require("fs")

const {askQuestion, askCheckbox} = require("../utils/question")
const {encryptLogin} = require("../utils/encryptAndDecrypt/encryptOrDecryptLogin")
const askForNewPassword = require("../utils/functions/askForNewPassword")
const printObj = require("../utils/functions/printObj")
const loginByName = require("../utils/functions/loginByName")

async function updateLoginByName(inputFilePath, inputPassword){
  await loginByName(inputFilePath, inputPassword, async (login, inputFile, i) => {
    printObj(login)
    // Ask is they want to change the name, username, and/or password
    const changes = await askCheckbox("What would you like to update: ", ["name", "username", "password"])
    // If the name wants to be updated
    if(changes.includes("name")){
      let newName
      while(true){
        newName = await askQuestion("Login's new name: (max 64)")
        if(newName.length > 64){
          console.log("The max length the login's name can be is 64 characters. Please try again.")
          continue
        }
        break
      }
      login.name = newName
    }
    // If the username wants to be updated
    if(changes.includes("username")){
      let newUsername
      while(true){
        newUsername = await askQuestion("Login's new username: (max 64)")
        if(newUsername.length > 64){
          console.log("The max length the login's username can be is 64 characters. Please try again.")
          continue
        }
        break
      }
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