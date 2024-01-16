#!/usr/bin/env node

import { z } from 'zod'
import fs from 'fs'
import generateRandomPassword from './generateRandomPassword'
import {askQuestion, askForFile, askPassword, askOptions, askYesOrNo} from './questions'
import { MasterPassword } from './types'
import {createNewLogin, getAllLogins, getLoginByName, updateLoginByName, deleteLoginByName} from "./options/index"

async function getInputFilePath(){
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

async function getMasterPassword(){
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

async function getUserOption(){
  const options = [
    "Get all logins",
    "Get all login names",
    "Get login by name",
    "Create new login",
    "Update login by name",
    "Delete login by name",
    "Generate random password",
    "Exit"
  ]

  // Use recursion to continually ask until exit
}

async function main(){
  // Get input file
  const inputFilePath = await getInputFilePath()
  // Get master password
  const masterPassword = await getMasterPassword()
  // Ask what the user wants to do

  let keepRunning = true
  while(keepRunning){
    const option = await askOptions("What would you like to do: ", options)
    console.log(option)
    switch(option){
      case "Get all logins":
        await getAllLogins(inputFilePath, inputPassword, false)
        break
      case "Get all login names":
        await getAllLogins(inputFilePath, inputPassword, true)
        break
      case "Get login by name":
        await getLoginByName(inputFilePath, inputPassword)
        break
      case "Create new login":
        await createNewLogin(inputFilePath, inputPassword)
        break
      case "Update login by name":
        await updateLoginByName(inputFilePath, inputPassword)
        break
      case "Delete login by name":
        await deleteLoginByName(inputFilePath, inputPassword)
        break
      case "Generate random password":
        // Ask for length
        let length
        while(true){
          length = parseInt(await askQuestion("Password length: "))
          if(!Number.isInteger(length)){
            console.log("Length must be an integer. Please try again.")
            continue
          }
          break
        }
        await generateRandomPassword(length, length)
        break
      case "Exit":
        keepRunning = false
        break
    }
  }
}

main()