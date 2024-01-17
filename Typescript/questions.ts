import fs from 'fs'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'

inquirer.registerPrompt('autocomplete', autocomplete)

function suggestFiles(answers, input): string[]{
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

async function questionTemplate(type: string, question: string, options?: string[]): Promise<string>{
  const {answer} = await inquirer.prompt([{
    type: type,
    name: "answer",
    message: question,
    choices: options,
    source: type === "autocomplete" ? suggestFiles : undefined,
    suggestOnly: true,
  }])

  return answer as string
}

export async function askQuestion(question: string): Promise<string> {return await questionTemplate("input", question)}
export async function askForFile(question: string): Promise<string> {return await questionTemplate("autocomplete", question)}
export async function askPassword(question: string): Promise<string> {return await questionTemplate("password", question)}
export async function askOptions(question: string, options: string[]): Promise<string> {return await questionTemplate("list", question, options)}
export async function askYesOrNo(question: string): Promise<string> {return await questionTemplate("confirm", question)}
export async function askCheckbox(question: string, options: string[]): Promise<string> {return await questionTemplate("checkbox", question, options)}