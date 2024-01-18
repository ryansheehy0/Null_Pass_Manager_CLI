import fs from 'fs'
import getLoginByName from "../utils/getLoginByName"
import { askCheckbox } from "../utils/questions"
import askForNewPassword from "../utils/askForNewPassword"
import encrypt from '../cryptography/encrypt'
import askForProperty from '../utils/askForProperty'
import printLogin from '../utils/printLogin'

export default async function updateLoginByName(inputFilePath: string, masterPassword: string): Promise<void>{
  const { login, loginIndex, encryptedLogins } = await getLoginByName(inputFilePath, masterPassword) ?? {}
  if(login === undefined || loginIndex === undefined || encryptedLogins === undefined) return
  printLogin(login)

  const updates = await askCheckbox("What would you like to update: ", ["name", "username", "password"])

  if(updates.includes("name")){
    login.name = await askForProperty("name")
  }

  if(updates.includes("username")){
    login.username = await askForProperty("username")
  }

  if(updates.includes("password")){
    const newPassword = await askForNewPassword()
    login.password = newPassword
    login.passwordLength = newPassword.length
  }

  // Encrypt the new login
  const newEncryptedLogin = encrypt(login, masterPassword)
  // Update inputFile
  encryptedLogins[loginIndex] = newEncryptedLogin
  // Write inputFile to file
  fs.writeFileSync(inputFilePath, JSON.stringify(encryptedLogins, null, 2))
}