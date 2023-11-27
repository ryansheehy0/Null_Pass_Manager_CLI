const crypto = require("crypto")
const { askQuestion, askCheckbox } = require("./question")

function generateRandomPassword(length, hasUpperCaseCharacters, hasNumbers, hasSpecialCharacters, hasSpaces){
  const lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz"
  const upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  const specialCharacters = "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/"

  let usableCharacters = lowerCaseCharacters
    if(hasUpperCaseCharacters) usableCharacters += upperCaseCharacters
    if(hasNumbers) usableCharacters += numbers
    if(hasSpecialCharacters) usableCharacters += specialCharacters
    if(hasSpaces) usableCharacters += " "

  let password = ""
  for(let i = 0; i < length; i++){
    const randomIndex = crypto.randomInt(usableCharacters.length)
    password += usableCharacters[randomIndex]
  }

  return password
}

async function askAndGenerateRandomPassword(){
  // Asks questions and generate random password
    // Get the length of the generated password
    let randomPasswordLength
    let passwordLengthCorrect = false
    while(!passwordLengthCorrect){ // Run if the password length isn't correct
      randomPasswordLength = parseInt(await askQuestion("Login's password's length: (max 64)"))
      if(!isNaN(randomPasswordLength)){ // If the input is a number
        if(randomPasswordLength <= 64 && randomPasswordLength >= 1){ // If the input is between 1 and 64 inclusive
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

module.exports = askAndGenerateRandomPassword