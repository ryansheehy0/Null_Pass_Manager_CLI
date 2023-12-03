const forEachLogin = require("../utils/functions/forEachLogin")

async function getAllLogins(inputFilePath, inputPassword, justNames){
  let outputFile = []
  await forEachLogin(inputFilePath, inputPassword, (login) => {
    if(justNames){
      outputFile.push(login.name)
    }else{
      outputFile.push(login)
    }
  })

  console.log()
  console.log(outputFile)
  console.log()
}

module.exports = getAllLogins