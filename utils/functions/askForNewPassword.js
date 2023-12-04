const generateRandomPassword = require("../../options/generateRandomPassword")
const {askYesOrNo, askPassword} = require("../question")

async function askForNewPassword(){
  let password
  const wantsPassword = await askYesOrNo("Generate random password: ")
  if(wantsPassword){
    password = await generateRandomPassword()
  }else{
    while(true){
      password = await askPassword("Login's password: (max 64)")
      if(password.length > 64){
        console.log("The max length the login's password can be is 64 characters. Please try again.")
        continue
      }
      let reEnteredPassword = await askPassword("Please re-enter your password: ")
      if(password !== reEnteredPassword){
        console.log("Passwords do not match. Please try again.")
        continue
      }
      break
    }
  }
  return password
}

module.exports = askForNewPassword