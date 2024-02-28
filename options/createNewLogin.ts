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

import fs from 'fs'
import { z } from 'zod'
import crypto from 'crypto'
import encrypt from '../cryptography/encrypt'
import askForNewPassword from '../utils/askForNewPassword'
import askForProperty from '../utils/askForProperty'
import { EncryptedLogins, Login } from '../utils/types'

export default async function createNewLogin(inputFilePath: string, masterPassword: string): Promise<void>{
  const encryptedLogins = JSON.parse(fs.readFileSync(inputFilePath).toString()) as z.infer<typeof EncryptedLogins>
  EncryptedLogins.parse(encryptedLogins)

  const newLogin: z.infer<typeof Login> = {
    uuid: crypto.randomUUID(),
    name: await askForProperty("name"),
    username: await askForProperty("username"),
    password: await askForNewPassword(),
    passwordLength: 0
  }
  newLogin.passwordLength = newLogin.password.length

  const newEncryptedLogin = encrypt(newLogin, masterPassword)

  encryptedLogins.push(newEncryptedLogin)
  fs.writeFileSync(inputFilePath, JSON.stringify(encryptedLogins, null, 2))
}