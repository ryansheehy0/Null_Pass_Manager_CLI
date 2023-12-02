const crypto = require("crypto")
const { askQuestion, askCheckbox } = require("../utils/question")

function newPassword(length, hasUpperCaseCharacters, hasNumbers, hasSpecialCharacters, hasSpaces){
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

async function generateRandomPassword(minLength = 1, maxLength = 64){
  // If the minLength and maxLength the length is already defined
  let passwordLengthCorrect = false
  let randomPasswordLength
  if(minLength === maxLength){
    passwordLengthCorrect = true
    randomPasswordLength = maxLength
  }

  // Get the length of the generated password
  while(!passwordLengthCorrect){ // Run if the password length isn't correct
    randomPasswordLength = parseInt(await askQuestion(`Password's length: (min: ${minLength}, max: ${maxLength})`))
    if(!isNaN(randomPasswordLength)){ // If the input is a number
      if(randomPasswordLength <= maxLength && randomPasswordLength >= minLength){ // If the input is between min and max inclusive
        passwordLengthCorrect = true
      }else{
        console.log(`The length must be a number between ${minLength} and ${maxLength}. Please try again.`)
      }
    }else{
      console.log(`The length must be a number between ${minLength} and ${maxLength}. Please try again.`)
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
  const generatedPassword = newPassword(randomPasswordLength, wantsUpperCaseCharacters, wantsNumbers, wantsSpecialCharacters, wantsSpaces)
  console.log()
  console.log(generatedPassword)
  console.log()
  return generatedPassword
}

module.exports = generateRandomPassword