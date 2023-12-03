const {askQuestion} = require("../question")
const forEachLogin = require("./forEachLogin")

async function loginByName(inputFilePath, inputPassword, loginFunction){
    // Ask for login name
    const loginName = await askQuestion("Login's name: ")

    let isThereALogin = false
    await forEachLogin(inputFilePath, inputPassword, async (login, inputFile, i) => {
      if(login.name.trim() === loginName){
        await loginFunction(login, inputFile, i)
        isThereALogin = true
      }
    })

    if(!isThereALogin){
      console.log()
      console.log("There was no login with that name. Please try again.")
      console.log()
    }

}

module.exports = loginByName