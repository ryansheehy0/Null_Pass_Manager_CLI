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
import getLoginByName from "../utils/getLoginByName"
import printLogin from '../utils/printLogin'

export default async function deleteLoginByName(inputFilePath: string, masterPassword: string): Promise<void>{
  const { login, loginIndex, encryptedLogins } = await getLoginByName(inputFilePath, masterPassword) ?? {}
  if(login === undefined || loginIndex === undefined || encryptedLogins === undefined) return
  printLogin(login)

  encryptedLogins.splice(loginIndex, 1)
  fs.writeFileSync(inputFilePath, JSON.stringify(encryptedLogins, null, 2))
}