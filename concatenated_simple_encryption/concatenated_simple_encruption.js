const fs = require("fs")
const {askForFile, askOptions, askPassword} = require("../utils/question")

async function asyncFunc(){
  const inputFile = await askForFile("Enter your input file: ")
  const file = fs.readFileSync(inputFile, 'ascii')

  const encryptOrDecrypt = await askOptions("Encrypt or decrypt: ", ["decrypt", "encrypt"])

  const password = await askPassword("Enter password: ")

  for(let i=0, passwordI=0; i < file.length; i++, passwordI++){
    const char = file.charAt(i)

    if(char === '\t' || char === '\n'){
      process.stdout.write(char)
      passwordI--
      continue
    }

    let passwordCode = password.charCodeAt(passwordI % password.length)
    let fileCode = file.charCodeAt(i)

    passwordCode -= 32
    fileCode -= 32

    let newFileCode
    if(encryptOrDecrypt === 'encrypt'){
      newFileCode = fileCode + passwordCode
    }else{
      newFileCode = (fileCode - passwordCode) + (127 - 32)
    }

    newFileCode = newFileCode % (127 - 32)

    newFileCode += 32

    const newFileChar = String.fromCharCode(newFileCode)

    process.stdout.write(newFileChar)
  }
}

asyncFunc()