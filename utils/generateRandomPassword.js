const crypto = require("crypto")

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

module.exports = generateRandomPassword