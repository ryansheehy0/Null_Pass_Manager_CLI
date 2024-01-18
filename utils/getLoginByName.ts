import { z } from 'zod'
import { EncryptedLogins, Login } from './types'
import fs from 'fs'
import decrypt from '../cryptography/decrypt'
import { askOptions } from './questions'

export default async function getLoginByName(inputFilePath: string, masterPassword: string): Promise<{login: z.infer<typeof Login>, loginIndex: number, encryptedLogins: z.infer<typeof EncryptedLogins>} | undefined>{
  const encryptedLogins = JSON.parse(fs.readFileSync(inputFilePath).toString()) as z.infer<typeof EncryptedLogins>
  EncryptedLogins.parse(encryptedLogins)

  let logins: z.infer<typeof Login>[] = []
  for(const encryptedLogin of encryptedLogins){
    const login = decrypt(encryptedLogin, masterPassword)
    logins.push(login)
  }

  if(logins.length === 0){
    console.log()
    console.log("You have no logins.")
    console.log()
    return
  }

  const loginOptions = logins.map((login) => {
    return {name: login.name.trim(), value: login.uuid}
  })

  while(true){
    const loginUUID = await askOptions("Select name of login: ", loginOptions)

    const loginIndex = logins.findIndex((login) => login.uuid === loginUUID)
    const login = logins[loginIndex]

    if(!login){
      console.log("Not an option. Please try again.")
      continue
    }

    return { login, loginIndex, encryptedLogins }
  }
}