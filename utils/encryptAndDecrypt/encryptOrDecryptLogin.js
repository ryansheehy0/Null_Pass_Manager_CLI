const hexSHA256 = require("./hexSHA256")
const simpleEncryption = require("./simpleEncryption")

function splitStringInHalf(string){
  // Find the midpoint rounded to the ending part of the string
  const midpoint = Math.ceil(string.length / 2)
  // Find the left substring
  const string1stHalf = string.slice(0, midpoint)
  // Find the right substring
  const string2ndHalf = string.slice(midpoint)
  // Return object with each half
  return {string1stHalf, string2ndHalf}
}

function encryptLogin({uuid, name, username, password}, inputPassword){
  // Split input password in half
  const {string1stHalf: password1stHalf, string2ndHalf: password2ndHalf} = splitStringInHalf(inputPassword)
  // encrypt name
  const nameHash = hexSHA256(uuid + "name" + password1stHalf)
  const encryptedName = simpleEncryption(simpleEncryption(name, nameHash, "encrypt"), password1stHalf, "encrypt")
  // encrypt username
  const usernameHash = hexSHA256(uuid + "username" + password1stHalf)
  const encryptedUsername = simpleEncryption(simpleEncryption(username, usernameHash, "encrypt"), password1stHalf, "encrypt")
  // encrypt password
  const passwordHash = hexSHA256(uuid + "password" + password2ndHalf)
  const encryptedPassword = simpleEncryption(simpleEncryption(password, passwordHash, "encrypt"), password2ndHalf, "encrypt")
  // Return encrypted login
  return {
    uuid,
    encryptedName,
    encryptedUsername,
    encryptedPassword
  }
}

function decryptLogin({uuid, encryptedName, encryptedUsername, encryptedPassword}, inputPassword){
  // Split input password in half
  const {string1stHalf: password1stHalf, string2ndHalf: password2ndHalf} = splitStringInHalf(inputPassword)
  // decrypt name
  const nameHash = hexSHA256(uuid + "name" + password1stHalf)
  const name = simpleEncryption(simpleEncryption(encryptedName, password1stHalf, "decrypt"), nameHash, "decrypt")
  // decrypt username
  const usernameHash = hexSHA256(uuid + "username" + password1stHalf)
  const username = simpleEncryption(simpleEncryption(encryptedUsername, password1stHalf, "decrypt"), usernameHash, "decrypt")
  // decrypt password
  const passwordHash = hexSHA256(uuid + "password" + password2ndHalf)
  const password = simpleEncryption(simpleEncryption(encryptedPassword, password2ndHalf, "decrypt"), passwordHash, "decrypt")
  // Return encrypted login
  return {
    uuid,
    name,
    username,
    password
  }
}

module.exports = {encryptLogin, decryptLogin}