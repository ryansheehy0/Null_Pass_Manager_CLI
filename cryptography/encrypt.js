"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hexSHA256_1 = __importDefault(require("./hexSHA256"));
const simpleEncryption_1 = __importDefault(require("./simpleEncryption"));
function encrypt(login, masterPassword) {
    const password1stHalf = masterPassword.slice(0, 64);
    const password2ndHalf = masterPassword.slice(64);
    // Encrypt name
    const nameHash = (0, hexSHA256_1.default)(login.uuid + "name" + password1stHalf);
    const encryptedName = (0, simpleEncryption_1.default)((0, simpleEncryption_1.default)(login.name, nameHash, "encrypt"), password1stHalf, "encrypt");
    // Encrypt username
    const usernameHash = (0, hexSHA256_1.default)(login.uuid + "username" + password1stHalf);
    const encryptedUsername = (0, simpleEncryption_1.default)((0, simpleEncryption_1.default)(login.username, usernameHash, "encrypt"), password1stHalf, "encrypt");
    // Encrypt password
    const passwordHash = (0, hexSHA256_1.default)(login.uuid + "password" + password2ndHalf);
    const encryptedPassword = (0, simpleEncryption_1.default)((0, simpleEncryption_1.default)(login.password, passwordHash, "encrypt"), password2ndHalf, "encrypt");
    // Encrypt password length
    const passwordLengthHash = (0, hexSHA256_1.default)(login.uuid + "passwordLength" + password2ndHalf);
    let encryptedPasswordLength = (0, simpleEncryption_1.default)((0, simpleEncryption_1.default)(login.passwordLength.toString(), passwordLengthHash, "encrypt"), password2ndHalf, "encrypt");
    encryptedPasswordLength = encryptedPasswordLength.slice(-2);
    return {
        uuid: login.uuid,
        encryptedName,
        encryptedUsername,
        encryptedPassword,
        encryptedPasswordLength
    };
}
exports.default = encrypt;
