import { z } from 'zod'
import { askQuestion, askCheckbox, askYesOrNo, askPassword } from './questions'
import crypto from 'crypto'
import askForProperty from './askForProperty'

function generateRandomPassword(length: number, hasUpperCaseCharacters: boolean, hasNumbers: boolean, hasSpecialCharacters: boolean, hasSpaces: boolean): string{
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

async function askForNewGeneratedPassword(): Promise<string>{
  while(true){
    const newPasswordLength = parseInt(await askQuestion("Password length: (max 64 characters)"))
    if(!z.number().int().lte(64).safeParse(newPasswordLength).success){
      console.log("The max length is 64 characters. Please try again.")
      continue
    }

    const newPasswordOptions = [
      "Upper Case Characters",
      "Numbers",
      "Special Characters",
      "Spaces"
    ]
    const selectedOptions = await askCheckbox("What characters do you want in your password: ", newPasswordOptions)

    return generateRandomPassword(
      newPasswordLength,
      selectedOptions.includes("Upper Case Characters"),
      selectedOptions.includes("Numbers"),
      selectedOptions.includes("Special Characters"),
      selectedOptions.includes("Spaces")
    )
  }
}

export default async function askForNewPassword(): Promise<string>{
  const generateNewPassword = await askYesOrNo("Do you want to generate a new password: ")
  let newPassword: string

  if(generateNewPassword){
    newPassword = await askForNewGeneratedPassword()
  }else{
    newPassword = await askForProperty("password")
  }

  return newPassword
}