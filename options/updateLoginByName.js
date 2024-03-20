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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const getLoginByName_1 = __importDefault(require("../utils/getLoginByName"));
const questions_1 = require("../utils/questions");
const askForNewPassword_1 = __importDefault(require("../utils/askForNewPassword"));
const encrypt_1 = __importDefault(require("../cryptography/encrypt"));
const askForProperty_1 = __importDefault(require("../utils/askForProperty"));
const printLogin_1 = __importDefault(require("../utils/printLogin"));
function updateLoginByName(inputFilePath, masterPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { login, loginIndex, encryptedLogins } = (_a = yield (0, getLoginByName_1.default)(inputFilePath, masterPassword)) !== null && _a !== void 0 ? _a : {};
        if (login === undefined || loginIndex === undefined || encryptedLogins === undefined)
            return;
        (0, printLogin_1.default)(login);
        const updates = yield (0, questions_1.askCheckbox)("What would you like to update: ", ["name", "username", "password"]);
        if (updates.includes("name")) {
            login.name = yield (0, askForProperty_1.default)("name");
        }
        if (updates.includes("username")) {
            login.username = yield (0, askForProperty_1.default)("username");
        }
        if (updates.includes("password")) {
            const newPassword = yield (0, askForNewPassword_1.default)();
            login.password = newPassword;
            login.passwordLength = newPassword.length;
        }
        // Encrypt the new login
        const newEncryptedLogin = (0, encrypt_1.default)(login, masterPassword);
        // Update inputFile
        encryptedLogins[loginIndex] = newEncryptedLogin;
        // Write inputFile to file
        fs_1.default.writeFileSync(inputFilePath, JSON.stringify(encryptedLogins, null, 2));
    });
}
exports.default = updateLoginByName;
