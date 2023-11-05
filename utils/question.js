const fs = require("fs")
const inquirer = require("inquirer")
const autocomplete = require("inquirer-autocomplete-prompt")

inquirer.registerPrompt('autocomplete', autocomplete)

function suggestFiles(answers, input){
  // This function gets the options for file tab autocompletion

  let directory     // The directory to be searched
  let search        // What's to be searched in the directory
  let beforeOptions // What's displayed in front of the options

  // if input is undefined
  if(!input){
    // directory = "./", search = "", beforeOptions = ""
    directory = "./"
    search = ""
    beforeOptions = ""
  // else
  }else{
    // if input ends in /
    if(input.substr(input.length - 1) === "/"){
      // directory = input, search = "", beforeOptions = directory
      directory = input
      search = ""
      beforeOptions = directory
    // else
    }else{
      // if input contains /
      if(input.includes("/")){
        const inputs = input.split("/")
        // search = everything after the last / not including the /
        search = inputs.pop()
        // directory = everything before the last / including the /
        directory = inputs.join("/") + "/"
        // beforeOptions = directory
        beforeOptions = directory
      // else
      }else{
        // directory = "./", search = input, beforeOptions = ""
        directory = "./"
        search = input
        beforeOptions = ""
      }
    }
  }
  try{
    return fs.readdirSync(directory)
      .map(option => {return beforeOptions + option})
      .filter(file => file.includes(search))
  }catch(error){
    return [""] // Prevent question from ending if there is an error
  }
}

async function questionTemplate(type, question, options = undefined){
  // This function is a template for questions in inquirer

  const {answer} = await inquirer.prompt([{
    type: type,
    name: "answer",
    message: question,
    choices: options,
    source: type === "autocomplete" ? suggestFiles : undefined,
    suggestOnly: true,
  }])

  return answer
}

async function askQuestion(question){return await questionTemplate("input", question)}
async function askForFile(question){return await questionTemplate("autocomplete", question)}
async function askPassword(question){return await questionTemplate("password", question)}
async function askOptions(question, options){return await questionTemplate("list", question, options)}
async function askYesOrNo(question){return await questionTemplate("confirm", question)}
async function askCheckbox(question, options){return await questionTemplate("checkbox", question, options)}


module.exports = {askQuestion, askForFile, askPassword, askOptions, askYesOrNo, askCheckbox}