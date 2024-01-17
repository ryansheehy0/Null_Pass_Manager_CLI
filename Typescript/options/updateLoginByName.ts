import fs from 'fs'
import getLoginByName from "../getLoginByName"
import { askCheckbox, askQuestion, askPassword, askYesOrNo } from "../questions"
import askForNewPassword from "../askForNewPassword"
import encrypt from '../cryptography/encrypt'

async function getProperty(property: "name" | "username"): Promise<string>{
  let newProperty: string
  const question = `Login's new ${property}: (max 64 characters)`

  while(true){
    newProperty = await askQuestion(question)
    if(newProperty.length > 64){
      console.log("The max length is 64 characters. Please try again.")
      continue
    }
    break
  }

  return newProperty
}

export default async function updateLoginByName(inputFilePath: string, masterPassword: string){
  const { login, loginIndex, encryptedLogins } = await getLoginByName(inputFilePath, masterPassword)
  console.log(login)

  const updates = await askCheckbox("What would you like to update: ", ["name", "username", "password"])

  if(updates.includes("name")){
    login.name = await getProperty("name")
  }

  if(updates.includes("username")){
    login.name = await getProperty("username")
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