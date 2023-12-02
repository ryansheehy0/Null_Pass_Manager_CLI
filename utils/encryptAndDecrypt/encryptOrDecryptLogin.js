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
  const encryptedName = simpleEncryption(name, simpleEncryption(password1stHalf, nameHash, "encrypt"), "encrypt")
  // encrypt username
  const usernameHash = hexSHA256(uuid + "username" + password1stHalf)
  const encryptedUsername = simpleEncryption(username, simpleEncryption(password1stHalf, usernameHash, "encrypt"), "encrypt")
  // encrypt password
  const passwordHash = hexSHA256(uuid + "password" + password2ndHalf)
  const encryptedPassword = simpleEncryption(password, simpleEncryption(password2ndHalf, passwordHash, "encrypt"), "encrypt")
  // Return encrypted login
  return {
    uuid,
    name: encryptedName,
    username: encryptedUsername,
    password: encryptedPassword
  }
}

function decryptLogin({uuid, name, username, password}, inputPassword){
  // Split input password in half
  const {string1stHalf: password1stHalf, string2ndHalf: password2ndHalf} = splitStringInHalf(inputPassword)
  // decrypt name
  const nameHash = hexSHA256(uuid + "name" + password1stHalf)
  const decryptedName = simpleEncryption(name, simpleEncryption(password1stHalf, nameHash, "encrypt"), "decrypt")
  // decrypt username
  const usernameHash = hexSHA256(uuid + "username" + password1stHalf)
  const decryptedUsername = simpleEncryption(username, simpleEncryption(password1stHalf, usernameHash, "encrypt"), "decrypt")
  // decrypt password
  const passwordHash = hexSHA256(uuid + "password" + password2ndHalf)
  const decryptedPassword = simpleEncryption(password, simpleEncryption(password2ndHalf, passwordHash, "encrypt"), "decrypt")
  // Return encrypted login
  return {
    uuid,
    name: decryptedName,
    username: decryptedUsername,
    password: decryptedPassword
  }
}

module.exports = {encryptLogin, decryptLogin}