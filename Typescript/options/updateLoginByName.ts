import { z } from 'zod'
import fs from 'fs'
import getLoginByName from "../getLoginByName"
import { askCheckbox, askQuestion, askPassword } from "../questions"

export default async function updateLoginByName(inputFilePath: string, masterPassword: string){
  const login = await getLoginByName(inputFilePath, masterPassword)
  console.log(login)

  const updates = await askCheckbox("What would you like to update: ", ["name", "username", "password"])

  if(updates.includes("name")){
    let newName: string
    while(true){
      newName = await askQuestion("Login's new name: (max 64 characters)")
      if(newName.length > 64){
        console.log("The max length the login's name can be is 64 characters. Please try again.")
        continue
      }
      break
    }
    login.name = newName
  }else if(updates.includes("username")){
    let newUsername: string
    while(true){
      newUsername = await askQuestion("Login's new username: (max 64 characters)")
      if(newUsername.length > 64){
        console.log("The max length the login's username can be is 64 characters. Please try again.")
        continue
      }
      break
    }
    login.name = newUsername
  }else if(updates.includes("password")){
    let newPassword: string
    while(true){
      newPassword = await askQuestion("Login's new password: (max 64 characters)")
      if(newPassword.length > 64){
        console.log("The max length the login's username can be is 64 characters. Please try again.")
        continue
      }
      break
    }
    login.name = newUsername

  }
}