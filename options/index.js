//const createNewLogin = require("./createNewLogin")
const generateRandomPassword = require("./generateRandomPassword")
const createNewLogin = require("./createNewLogin")
const getAllLogins = require("./getAllLogins")
const getLoginByName = require("./getLoginByName")
const updateLoginByName = require("./updateLoginByName")
const deleteLoginByName = require("./deleteLoginByName")

module.exports = {generateRandomPassword, createNewLogin, getAllLogins, getLoginByName, updateLoginByName, deleteLoginByName}