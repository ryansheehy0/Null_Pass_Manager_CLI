// Ask for input file location
// Get all logins
  // Ask for password
// Get login by name
  // Ask for password
  // List all of the names that can be used
// Create new login
  // Ask for name
  // Ask for username
  // Generate random password: yes/no
    // if no then Ask for password
// Update password by name
  // Ask for name
  // Generate random password: yes/no
    // if no then Ask for password
// Delete login by name
  // Ask for name
const createNewLogin = require("./crud/create/createNewLogin")

const {askQuestion, askForFile, askPassword, askOptions} = require("./utils/question")

async function test(){
  // Ask for input file
  const inputFile = await askForFile("Enter you input file: ")
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
  await createNewLogin(inputFile, password)
  /*
  switch(option){
    case options[0]:
      break

  }
  */
}

test()