#!/usr/bin/env node

import fs from 'fs'
import { generateRandomPassword } from './utils/askForNewPassword'
import {askQuestion, askForFile, askPassword, askOptions} from './utils/questions'
import getLoginByName from './utils/getLoginByName'
import printLogin from './utils/printLogin'
import updateLoginByName from './options/updateLoginByName'
import deleteLoginByName from './options/deleteLoginByName'
import createNewLogin from './options/createNewLogin'

async function getInputFilePath(): Promise<string>{
  let inputFilePath = await askForFile("Enter encrypted input file or give a folder location to create a new one: ")
  let inputFileStats: fs.Stats
  try{
    inputFileStats = fs.lstatSync(inputFilePath)
  }catch(error){
    console.error()
    console.error("You must enter an encrypted json file or give a folder location. Please try again.")
    console.error()
    process.exit(1)
  }
  if(inputFileStats.isFile()){
    try{
      // Check if the input file is a json file
      JSON.parse(fs.readFileSync(inputFilePath).toString())
    }catch(error){
      console.error()
      console.error("Input file must be an encrypted json file. Please try again.")
      console.error()
      process.exit(1)
    }
  }else if(inputFileStats.isDirectory()){
    const newFileName = await askQuestion("What's your new file name: ")
    try{
      fs.writeFileSync(inputFilePath + newFileName + ".json", "[]")
    }catch(error){
      console.error()
      console.error("Something went wrong creating your new file. Please try again.")
      console.error()
      process.exit(1)
    }
    inputFilePath = inputFilePath + newFileName + ".json"
  }

  return inputFilePath
}

async function getMasterPassword(): Promise<string>{
  while(true){
    let masterPassword = await askPassword('Enter master password (128 characters) or type "g" to generate a new one: ')
    if(masterPassword === "g"){
      masterPassword = generateRandomPassword(128, true, true, true, false)
      console.log()
      console.log(`You new master password is: ${masterPassword}`)
      console.log(`	Make sure to securely save this password. Without it, you won't be able to retrieve future login information.`)
      console.log()
    }else{
      if(masterPassword.length !== 128){
        console.log()
        console.log("Master password must be exactly 128 characters in length. Please try again.")
        console.log()
        continue
      }
    }
 
    return masterPassword
  }

}

async function userOptions(inputFilePath: string, masterPassword: string): Promise<void>{
  const options = [
    "Get login by name",
    "Create new login",
    "Update login by name",
    "Delete login by name",
    "Exit"
  ]

  while(true){
    const option = await askOptions("What would you like to do: ", options)

    switch(option){
      case "Get login by name":
        printLogin((await getLoginByName(inputFilePath, masterPassword))?.login)
        break
      case "Create new login":
        await createNewLogin(inputFilePath, masterPassword)
        break
      case "Update login by name":
        await updateLoginByName(inputFilePath, masterPassword)
        break
      case "Delete login by name":
        await deleteLoginByName(inputFilePath, masterPassword)
        break
      case "Exit":
        return
    }
  }
}

async function main(): Promise<void>{
  // Get input file
  const inputFilePath = await getInputFilePath()
  // Get master password
  const masterPassword = await getMasterPassword()
  // Do what the user wants to do
  await userOptions(inputFilePath, masterPassword)
}

main()