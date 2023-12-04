const forEachLogin = require("../utils/functions/forEachLogin")
const printObj = require("../utils/functions/printObj")

async function getAllLogins(inputFilePath, inputPassword, justNames){
  let outputFile = []
  await forEachLogin(inputFilePath, inputPassword, (login) => {
    if(justNames){
      outputFile.push(login.name)
    }else{
      outputFile.push(login)
    }
  })

  if(justNames){
    console.log()
    console.log(outputFile)
    console.log()
  }else{
    printObj(outputFile)
  }
}

module.exports = getAllLogins