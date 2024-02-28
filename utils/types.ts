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

export const Login = z.object({
  uuid: z.string().uuid(),
  name: z.string().max(64),
  username: z.string().max(64),
  password: z.string().max(64),
  passwordLength: z.number().lte(64).int()
})

export const EncryptedLogin = z.object({
  uuid: z.string().uuid(),
  encryptedName: z.string().max(64),
  encryptedUsername: z.string().max(64),
  encryptedPassword: z.string().max(64),
  encryptedPasswordLength: z.string().max(2)
})

export const EncryptedLogins = EncryptedLogin.array()

export const MasterPassword = z.string().length(128)