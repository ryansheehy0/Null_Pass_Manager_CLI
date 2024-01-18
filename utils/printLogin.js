"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printLogin(login) {
    if (!login)
        return;
    const printedLogin = {
        name: login.name,
        username: login.username,
        password: login.password.substring(0, login.passwordLength)
    };
    console.log();
    console.log(printedLogin);
    console.log();
}
exports.default = printLogin;
/*
const chalk = require("chalk")

function printObj(logins){
  // used to color console logs
  const printingString = JSON.stringify({logins}, null, 2).replace(/\\\\/g, "\\")
  let coloredJson = printingString.replace(/\d(?!.*")/g, (match, p1) => chalk.yellow(match))
  coloredJson = coloredJson.replace(/(?<=: )"(.*)"/g, (match, p1) => chalk.green(`"${p1}"`))

  let array = coloredJson.split("\n")
  array = array.slice(2, -2)
  coloredJson = array.join("\n")

  console.log()
  console.log(coloredJson)
  console.log()
}

module.exports = printObj
*/ 
