import fs from 'fs'
import getLoginByName from "../getLoginByName"

export default async function deleteLoginByName(inputFilePath: string, masterPassword: string): Promise<void>{
  const { login, loginIndex, encryptedLogins } = await getLoginByName(inputFilePath, masterPassword)
  console.log(login)

  encryptedLogins.splice(loginIndex, 1)
  fs.writeFileSync(inputFilePath, JSON.stringify(encryptedLogins, null, 2))
}