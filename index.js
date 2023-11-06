const createNewLogin = require("./crud/createNewLogin")
const fs = require("fs")

const {askQuestion, askForFile, askPassword, askOptions, askYesOrNo} = require("./utils/question")

async function test(){
  // Ask for input file
  const inputFile = await askForFile("Enter you input file: ")
  const logins = JSON.parse(fs.readFileSync(inputFile))
  // Ask for password
  const password = await askPassword("Enter password: ")
  // Ask what the user wants to do
  const options = [
    "Get all logins",
    "Get login by name",
    "Create new login",
    "Update password by name",
    "Delete login by name"
  ]
  const option = await askOptions("What would you like to do: ", options)
  await createNewLogin(logins, password)
  /*
  switch(option){
    case options[0]:
      break

  }
  */
}

test()