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