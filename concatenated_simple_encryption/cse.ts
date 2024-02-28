#!/usr/bin/env node

/*
 * This file is part of Concatenated Simple Encryption.
 *
 * Concatenated Simple Encryption is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Concatenated Simple Encryption is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Concatenated Simple Encryption. If not, see <https://www.gnu.org/licenses/>.
 */

import fs from 'fs'
import { askForFile, askPassword, askOptions } from '../utils/questions'

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