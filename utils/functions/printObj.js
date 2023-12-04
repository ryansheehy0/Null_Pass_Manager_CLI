const chalk = require("chalk")

function printObj(logins){
  const printingString = JSON.stringify({logins}, null, 2).replace(/\\\\/g, "\\")
  let coloredJson = printingString.replace(/\d(?!.*")/g, (match, p1) => chalk.yellow(match))
  coloredJson = coloredJson.replace(/(?<=: )"(.*)"/g, (match, p1) => chalk.green(`"${p1}"`))

  console.log()
  console.log(coloredJson)
  console.log()
}

module.exports = printObj