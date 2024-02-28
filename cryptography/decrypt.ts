/*
 * This file is part of Null Pass Manager.
 *
 * Null Pass Manager is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Null Pass Manager is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Null Pass Manager. If not, see <https://www.gnu.org/licenses/>.
 */

import { z } from 'zod'
import { Login, EncryptedLogin, MasterPassword } from '../utils/types'
import hexSHA256 from './hexSHA256'
import simpleEncryption from './simpleEncryption'

export default function decrypt(encryptedLogin: z.infer<typeof EncryptedLogin>, masterPassword: z.infer<typeof MasterPassword>): z.infer<typeof Login>{
  const password1stHalf = masterPassword.slice(0, 64)
  const password2ndHalf = masterPassword.slice(64)

  // Decrypt name
  const nameHash = hexSHA256(encryptedLogin.uuid + "name" + password1stHalf)
  const name = simpleEncryption(simpleEncryption(encryptedLogin.encryptedName, password1stHalf, "decrypt"), nameHash, "decrypt")
  // Decrypt username
  const usernameHash = hexSHA256(encryptedLogin.uuid + "username" + password1stHalf)
  const username = simpleEncryption(simpleEncryption(encryptedLogin.encryptedUsername, password1stHalf, "decrypt"), usernameHash, "decrypt")
  // Decrypt password
  const passwordHash = hexSHA256(encryptedLogin.uuid + "password" + password2ndHalf)
  const password = simpleEncryption(simpleEncryption(encryptedLogin.encryptedPassword, password2ndHalf, "decrypt"), passwordHash, "decrypt")
  // Decrypt passwordLength
  const passwordLengthHash = hexSHA256(encryptedLogin.uuid + "passwordLength" + password2ndHalf)
  let passwordLength = simpleEncryption(simpleEncryption(encryptedLogin.encryptedPasswordLength, password2ndHalf, "decrypt"), passwordLengthHash, "decrypt")
  passwordLength = passwordLength.slice(-2)

  return {
    uuid: encryptedLogin.uuid,
    name,
    username,
    password,
    passwordLength: parseInt(passwordLength)
  }
}