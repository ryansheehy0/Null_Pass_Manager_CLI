/*
 * This file is part of Null Pass Manager.
 *
 * Null Pass Manager is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Null Pass Manager is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Null Pass Manager. If not, see <https://www.gnu.org/licenses/>.
 */

import { z } from 'zod'
import { askQuestion, askCheckbox, askYesOrNo } from './questions'
import crypto from 'crypto'
import askForProperty from './askForProperty'

export function generateRandomPassword(length: number, hasUpperCaseCharacters: boolean, hasNumbers: boolean, hasSpecialCharacters: boolean, hasSpaces: boolean): string{
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
    if(!z.number().int().lte(64).gt(0).safeParse(newPasswordLength).success){
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

    const newGeneratedPassword = generateRandomPassword(
      newPasswordLength,
      selectedOptions.includes("Upper Case Characters"),
      selectedOptions.includes("Numbers"),
      selectedOptions.includes("Special Characters"),
      selectedOptions.includes("Spaces")
    )

    console.log()
    console.log(newGeneratedPassword)
    console.log()

    return newGeneratedPassword
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