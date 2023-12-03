const loginByName = require("../utils/functions/loginByName")

async function getLoginByName(inputFilePath, inputPassword){
    await loginByName(inputFilePath, inputPassword, (login) => {
      console.log()
      console.log(login)
      console.log()
    })
}

module.exports = getLoginByName