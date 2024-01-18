import { askQuestion, askPassword } from "./questions"

export default async function getProperty(property: "name" | "username" | "password"): Promise<string>{
  let newProperty: string
  const question = `Login's new ${property}: (max 64 characters)`

  while(true){
    newProperty = property === "password" ? await askPassword(question) : await askQuestion(question)
    if(newProperty.length > 64){
      console.log("The max length is 64 characters. Please try again.")
      continue
    }
    break
  }

  return newProperty
}