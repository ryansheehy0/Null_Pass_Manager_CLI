#!/usr/bin/env node

/* TODO:
  - Print out login with the password shortened to length
*/

import fs from 'fs'
import generateRandomPassword from './generateRandomPassword'
import {askQuestion, askForFile, askPassword, askOptions} from './questions'
import { MasterPassword } from './types'
import getLoginByName from './getLoginByName'
import updateLoginByName from './options/updateLoginByName'
import deleteLoginByName from './options/deleteLoginByName'
import createNewLogin from './options/createNewLogin'

async function getInputFilePath(): Promise<string>{
  let inputFilePath = await askForFile("Enter encrypted input file or give a folder location to create a new one: ")
  const inputFileStats = fs.lstatSync(inputFilePath)
  if(inputFileStats.isFile()){
    try{
      // Check if the input file is a json file
      JSON.parse(fs.readFileSync(inputFilePath).toString())
    }catch(error){
      throw new Error("Input file must be an encrypted json file. Please try again.")
    }
  }else if(inputFileStats.isDirectory()){
    // Ask for name for new encrypted file
    const newFileName = await askQuestion("What's your new file name: ")
    // Create new json file with empty array
    try{
      fs.writeFileSync(inputFilePath + newFileName + ".json", "[]")
    }catch(error){
      throw new Error("Something went wrong creating your new file. Please try again.")
    }
    inputFilePath = inputFilePath + newFileName + ".json"
  }else{
    throw new Error("You must enter an encrypted json file or give a folder location. Please try again.")
  }

  return inputFilePath
}

async function getMasterPassword(): Promise<string>{
  let masterPassword = await askPassword('Enter master password (128 characters) or type "g" to generate a new one: ')
  if(masterPassword === "g"){
    masterPassword = generateRandomPassword(128, true, true, true, true)
    console.log()
    console.log(`You new master password is: "${masterPassword}"`)
    console.log(`	Make sure to securely save this password. Without it, you won't be able to retrieve future login information.`)
    console.log()
  }else{
    MasterPassword.parse(masterPassword)
  }

  return masterPassword
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
    console.log(option)

    switch(option){
      case "Get login by name":
        console.log(await getLoginByName(inputFilePath, masterPassword))
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
        console.log("Exit")
        break
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