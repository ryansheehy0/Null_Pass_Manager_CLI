import { z } from 'zod'
import { EncryptedLogin, Login } from './types'
import fs from 'fs'
import decrypt from './cryptography/decrypt'
import { askOptions } from './questions'

export default async function getLoginByName(inputFilePath: string, masterPassword: string): Promise<z.infer<typeof Login>>{
  const encryptedLogins = JSON.parse(fs.readFileSync(inputFilePath).toString())
  const EncryptedLogins = z.array(EncryptedLogin)
  EncryptedLogins.parse(encryptedLogins)

  let logins: z.infer<typeof Login>[] = []
  for(const encryptedLogin of encryptedLogins){
    const login = decrypt(encryptedLogin, masterPassword)
    logins.push(login)
  }

  const loginNames = logins.map((login) => login.name)

  while(true){
    const loginName = await askOptions("Select name of login: ", loginNames)

    const login = logins.find((login) => login.name === loginName)

    if(!login){
      console.log("Not an option. Please try again.")
      continue
    }

    return login
  }
}