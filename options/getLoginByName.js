const loginByName = require("../utils/functions/loginByName")
const printObj = require("../utils/functions/printObj")

async function getLoginByName(inputFilePath, inputPassword){
    await loginByName(inputFilePath, inputPassword, (login) => {
      printObj(login)
    })
}

module.exports = getLoginByName