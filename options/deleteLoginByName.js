const loginByName = require("../utils/functions/loginByName")

async function deleteLoginByName(inputFilePath, inputPassword){
  await loginByName(inputFilePath, inputPassword, (login, inputFile, i) => {
    // Remove login name
    inputFile.splice(i, 1)
    // Write inputFile to file
    fs.writeFileSync(inputFilePath, JSON.stringify(inputFile, null, 2))
  })
}

module.exports = deleteLoginByName