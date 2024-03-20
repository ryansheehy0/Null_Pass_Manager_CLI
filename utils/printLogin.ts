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
import { Login } from './types'

export default function printLogin(login?: z.infer<typeof Login>): void{
  if(!login) return

  const printedLogin = {
    name: login.name.trim(),
    username: login.username.trim(),
    password: login.password.substring(64 - login.passwordLength)
  }

  console.log()
  console.log(`\x1b[0mname: \x1b[32m${printedLogin.name}`)
  console.log(`\x1b[0musername: \x1b[32m${printedLogin.username}`)
  console.log(`\x1b[0mpassword: \x1b[32m${printedLogin.password}`)
  console.log()
}