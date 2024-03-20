"use strict";
/*
 * This file is part of Null Pass Manager.
 *
 * Null Pass Manager is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Null Pass Manager is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Null Pass Manager. If not, see <https://www.gnu.org/licenses/>.
 */
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
