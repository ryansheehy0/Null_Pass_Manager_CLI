const fs = require("fs")

const {askQuestion, askForFile, askPassword, askOptions, askYesOrNo} = require("./utils/question")
const {generateRandomPassword, createNewLogin, getAllLogins, getLoginByName} = require("./options/index")

async function asyncFunc(){
  // Ask for input file
  let inputFilePath = await askForFile("Enter encrypted input file or give a folder location to create a new one: ")
  const inputFileStats = fs.lstatSync(inputFilePath)
  if(inputFileStats.isFile()){
    try{
      // Check if the input file is a json file
      JSON.parse(fs.readFileSync(inputFilePath))
    }catch(error){
      throw new Error("Input file must be an encrypted json file. Please try again.")
    }
  }else if(inputFileStats.isDirectory()){
    // Ask for name for new encrypted file
    const newFileName = await askQuestion("What's your new file name: ")
    // Create new json file with empty array
    fs.writeFileSync(inputFilePath + newFileName + ".json", "[]")
    inputFilePath = inputFilePath + newFileName + ".json"
  }else{
    throw new Error("You must enter an encrypted json file or give a folder location. Please try again.")
  }

  // Ask if they would like to generate a new random master password
  let inputPassword
  const wantsPassword = await askYesOrNo("Generate new master password: ")
  if(wantsPassword){
    inputPassword = await generateRandomPassword(128, 128)
  }else{
    inputPassword = await askPassword("Enter master password: (128 chars)")
    while(inputPassword.length !== 128){
      console.log("Master password must be 128 characters long. Please try again.")
      inputPassword = await askPassword("Enter master password: (128 chars)")
    }
  }
  // Ask what the user wants to do
  const options = [
    "Get all logins",
    "Get login by name",
    "Create new login",
    "Update login by name",
    "Delete login by name",
    "Generate random password",
    "Exit"
  ]

  let keepRunning = true
  while(keepRunning){
    const option = await askOptions("What would you like to do: ", options)
    console.log(option)
    switch(option){
      case "Get all logins":
        await getAllLogins(inputFilePath, inputPassword)
        break
      case "Get login by name":
        await getLoginByName(inputFilePath, inputPassword)
        break
      case "Create new login":
        await createNewLogin(inputFilePath, inputPassword)
        break
      case "Update login by name":
        // await updateLoginByName(inputFilePath, inputPassword)
        break
      case "Delete login by name":
        // await deleteLoginByName(inputFilePath, inputPassword)
        break
      case "Generate random password":
        await generateRandomPassword()
        break
      case "Exit":
        keepRunning = false
        break
    }
  }
}

asyncFunc()