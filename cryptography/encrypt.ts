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

export default function encrypt(login: z.infer<typeof Login>, masterPassword: z.infer<typeof MasterPassword>): z.infer<typeof EncryptedLogin>{
  const password1stHalf = masterPassword.slice(0, 64)
  const password2ndHalf = masterPassword.slice(64)

  // Encrypt name
  const nameHash = hexSHA256(login.uuid + "name" + password1stHalf)
  const encryptedName = simpleEncryption(simpleEncryption(login.name, nameHash, "encrypt"), password1stHalf, "encrypt")
  // Encrypt username
  const usernameHash = hexSHA256(login.uuid + "username" + password1stHalf)
  const encryptedUsername = simpleEncryption(simpleEncryption(login.username, usernameHash, "encrypt"), password1stHalf, "encrypt")
  // Encrypt password
  const passwordHash = hexSHA256(login.uuid + "password" + password2ndHalf)
  const encryptedPassword = simpleEncryption(simpleEncryption(login.password, passwordHash, "encrypt"), password2ndHalf, "encrypt")
  // Encrypt password length
  const passwordLengthHash = hexSHA256(login.uuid + "passwordLength" + password1stHalf)
  let encryptedPasswordLength = simpleEncryption(simpleEncryption(login.passwordLength.toString(), passwordLengthHash, "encrypt"), password1stHalf, "encrypt")
  encryptedPasswordLength = encryptedPasswordLength.slice(-2)

  return {
    uuid: login.uuid,
    encryptedName,
    encryptedUsername,
    encryptedPassword,
    encryptedPasswordLength
  }
}