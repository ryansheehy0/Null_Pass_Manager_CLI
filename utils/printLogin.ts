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
  console.log(printedLogin)
  console.log()
}