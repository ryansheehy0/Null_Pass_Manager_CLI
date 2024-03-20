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
    const passwordLengthHash = (0, hexSHA256_1.default)(login.uuid + "passwordLength" + password1stHalf);
    let encryptedPasswordLength = (0, simpleEncryption_1.default)((0, simpleEncryption_1.default)(login.passwordLength.toString(), passwordLengthHash, "encrypt"), password1stHalf, "encrypt");
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
