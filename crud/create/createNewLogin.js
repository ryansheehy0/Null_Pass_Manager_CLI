const { askQuestion, askYesOrNo, askCheckbox, askPassword } = require("../../utils/question")
const sha256 = require("../../utils/sha256")
const generateRandomPassword = require("../../utils/generateRandomPassword")

async function getRandomPassword(){
  // Asks questions and generate random password
    // Get the length of the generated password
    let randomPasswordLength = 64
    let passwordLengthCorrect = false
    while(!passwordLengthCorrect){ // Run if the password length isn't correct
      randomPasswordLength = parseInt(await askQuestion("Login's password's length: (max 64)"))
      if(!isNaN(randomPasswordLength)){ // If the input is a number
        if(randomPasswordLength < 64 && randomPasswordLength > 1){ // If the input is between 1 and 64
          passwordLengthCorrect = true
        }else{
          console.log("The length must be a number between 1 and 64. Please try again.")
        }
      }else{
        console.log("The length must be a number between 1 and 64. Please try again.")
      }
    }

    // Get which characters can go into the generated password
    const randomPasswordOptions = [
      "Upper Case Characters",
      "Numbers",
      "Special Characters",
      "Spaces"
    ]
    const randomPasswordSelectedOptions = await askCheckbox("What characters do you want in your password: ", randomPasswordOptions)
    const wantsUpperCaseCharacters = randomPasswordSelectedOptions.includes("Upper Case Characters")
    const wantsNumbers = randomPasswordSelectedOptions.includes("Numbers")
    const wantsSpecialCharacters = randomPasswordSelectedOptions.includes("Special Characters")
    const wantsSpaces = randomPasswordSelectedOptions.includes("Spaces")

    // Generate random password
    return generateRandomPassword(randomPasswordLength, wantsUpperCaseCharacters, wantsNumbers, wantsSpecialCharacters, wantsSpaces)
}

function generateEncryptedLogin(uuid, loginName, loginUsername, loginPassword){
  let encryptedLogin = {uuid}

  // Encrypt name
  const sha256Name = sha256(loginName + uuid + "name")
}

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
}

module.exports = createNewLogin