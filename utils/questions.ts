import fs from 'fs'
//import inquirer from 'inquirer'
const inquirer = require('inquirer')
//import autocomplete from 'inquirer-autocomplete-prompt'
const autocomplete = require('inquirer-autocomplete-prompt')

inquirer.registerPrompt('autocomplete', autocomplete)

function suggestFiles(answers: any, input: any): string[]{
  // This function gets the options for file tab autocompletion

  let directory: string     // The directory to be searched
  let search: string        // What's to be searched in the directory
  let beforeOptions: string // What's displayed in front of the options

  if(!input){
    directory = "./"
    search = ""
    beforeOptions = ""
  }else{
    if(input.at(-1) === "/"){
      directory = input
      search = ""
      beforeOptions = directory
    }else{
      if(input.includes("/")){
        // Ex: input = ../../file.json
          // search = file.json
          // directory = ../../
        const inputs = input.split("/")
        search = inputs.pop()
        directory = inputs.join("/") + "/"
        beforeOptions = directory
      }else{
        directory = "./"
        search = input
        beforeOptions = ""
      }
    }
  }

  try{
    return fs.readdirSync(directory)
      .map(option => beforeOptions + option)
      .filter(file => file.includes(search))
  }catch(error){
    return [""] // Prevent question from ending if there is an error
  }
}

async function questionTemplate<T>(type: string, question: string, options?: string[]): Promise<T>{
  const {answer} = await inquirer.prompt([{
    type: type,
    name: "answer",
    message: question,
    choices: options,
    source: type === "autocomplete" ? suggestFiles : undefined,
    suggestOnly: true,
  }])

  return answer as T
}

export async function askQuestion(question: string): Promise<string> {return await questionTemplate<string>("input", question)}
export async function askForFile(question: string): Promise<string> {return await questionTemplate<string>("autocomplete", question)}
export async function askPassword(question: string): Promise<string> {return await questionTemplate<string>("password", question)}
export async function askOptions(question: string, options: string[]): Promise<string> {return await questionTemplate<string>("list", question, options)}
export async function askYesOrNo(question: string): Promise<boolean> {return await questionTemplate<boolean>("confirm", question)}
export async function askCheckbox(question: string, options: string[]): Promise<string[]> {return await questionTemplate<string[]>("checkbox", question, options)}