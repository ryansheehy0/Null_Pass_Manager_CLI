"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hexSHA256_1 = __importDefault(require("./hexSHA256"));
const simpleEncryption_1 = __importDefault(require("./simpleEncryption"));
function decrypt(encryptedLogin, masterPassword) {
    const password1stHalf = masterPassword.slice(0, 64);
    const password2ndHalf = masterPassword.slice(64);
    // Decrypt name
    const nameHash = (0, hexSHA256_1.default)(encryptedLogin.uuid + "name" + password1stHalf);
    const name = (0, simpleEncryption_1.default)((0, simpleEncryption_1.default)(encryptedLogin.encryptedName, password1stHalf, "decrypt"), nameHash, "decrypt");
    // Decrypt username
    const usernameHash = (0, hexSHA256_1.default)(encryptedLogin.uuid + "username" + password1stHalf);
    const username = (0, simpleEncryption_1.default)((0, simpleEncryption_1.default)(encryptedLogin.encryptedUsername, password1stHalf, "decrypt"), usernameHash, "decrypt");
    // Decrypt password
    const passwordHash = (0, hexSHA256_1.default)(encryptedLogin.uuid + "password" + password2ndHalf);
    const password = (0, simpleEncryption_1.default)((0, simpleEncryption_1.default)(encryptedLogin.encryptedPassword, password2ndHalf, "decrypt"), passwordHash, "decrypt");
    // Decrypt passwordLength
    const passwordLengthHash = (0, hexSHA256_1.default)(encryptedLogin.uuid + "passwordLength" + password2ndHalf);
    let passwordLength = (0, simpleEncryption_1.default)((0, simpleEncryption_1.default)(encryptedLogin.encryptedPasswordLength, password2ndHalf, "decrypt"), passwordLengthHash, "decrypt");
    passwordLength = passwordLength.slice(-2);
    return {
        uuid: encryptedLogin.uuid,
        name,
        username,
        password,
        passwordLength: parseInt(passwordLength)
    };
}
exports.default = decrypt;
