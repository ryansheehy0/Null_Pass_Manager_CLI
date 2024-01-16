import crypto from 'crypto'

export default function generateRandomPassword(length: number, hasUpperCaseCharacters: boolean, hasNumbers: boolean, hasSpecialCharacters: boolean, hasSpaces: boolean): string{
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