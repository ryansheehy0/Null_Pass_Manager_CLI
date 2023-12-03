const generateRandomPassword = require("../../options/generateRandomPassword")
const {askYesOrNo, askPassword} = require("../question")

async function askForNewPassword(){
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
  return password
}

module.exports = askForNewPassword