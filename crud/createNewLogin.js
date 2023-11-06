const { askQuestion, askYesOrNo, askPassword } = require("../utils/question")
const getUUID = require("../utils/getUUID")

async function createNewLogin(logins, password){
  // Ask for login's name
  const loginName = await askQuestion("Login's name: ")
  // Ask for login's username
  const loginUsername = await askQuestion("Login's username: ")

  let loginPassword
  // Ask if the user wants a generated password
  const wantsPassword = await askYesOrNo("Generate random password: ")
  if(wantsPassword){
    loginPassword = await getRandomPassword()
  }else{
    // Ask the user for their password
    let passwordConfirmed = false
    while(!passwordConfirmed){ // Ask for password if the password isn't confirmed
      loginPassword = await askPassword("Login's password: ")
      const reEnteredLoginPassword = await askPassword("Please re-enter your password: ")
      if(loginPassword === reEnteredLoginPassword){
        passwordConfirmed = true
      }else{
        console.log("Passwords do not match. Please try again.")
      }
    }
  }

  console.log(loginName, loginUsername, loginPassword)

  console.log(generateEncryptedLogin())
}

module.exports = createNewLogin