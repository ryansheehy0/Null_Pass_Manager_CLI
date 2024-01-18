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