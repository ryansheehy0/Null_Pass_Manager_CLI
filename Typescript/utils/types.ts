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

export const MasterPassword = z.string().length(128, { message: "Master password must be exactly 128 characters in length. Please try again."})