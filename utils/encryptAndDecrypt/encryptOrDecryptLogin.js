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
  return { string1stHalf, string2ndHalf}
}

function encryptLogin({uuid, name, username, password}, inputPassword){
  // Split input password in half
  const { string1stHalf: password1stHalf, string2ndHalf: password2ndHalf} = splitStringInHalf(inputPassword)
  // encrypt name
  const hashedName = hexSHA256(name + uuid + password1stHalf)
  const encryptedName = simpleEncryption(name, hashedName, "encrypt")
  // encrypt username
  const hashedUsername = hexSHA256(username + uuid + password1stHalf)
  const encryptedUsername = simpleEncryption(username, hashedUsername, "encrypt")
  // encrypt password
  const hashedPassword = hexSHA256(password + uuid + password2ndHalf)
  const encryptedPassword = simpleEncryption(password, hashedPassword, "encrypt")
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
  const { string1stHalf: password1stHalf, string2ndHalf: password2ndHalf} = splitStringInHalf(inputPassword)
  // decrypt name
  const hashedName = hexSHA256(name + uuid + password1stHalf)
  const decryptedName = simpleEncryption(name, hashedName, "decrypt")
  // decrypt username
  const hashedUsername = hexSHA256(username + uuid + password1stHalf)
  const decryptedUsername = simpleEncryption(username, hashedUsername, "decrypt")
  // decrypt password
  const hashedPassword = hexSHA256(password + uuid + password2ndHalf)
  const decryptedPassword = simpleEncryption(password, hashedPassword, "decrypt")
  // Return encrypted login
  return {
    uuid,
    name: decryptedName,
    username: decryptedUsername,
    password: decryptedPassword
  }
}

module.exports = {encryptLogin, decryptLogin}