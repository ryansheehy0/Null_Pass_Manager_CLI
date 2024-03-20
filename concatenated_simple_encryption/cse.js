#!/usr/bin/env node
"use strict";
/*
 * This file is part of Concatenated Simple Encryption.
 *
 * Concatenated Simple Encryption is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Concatenated Simple Encryption is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Concatenated Simple Encryption. If not, see <https://www.gnu.org/licenses/>.
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
const questions_1 = require("../utils/questions");
function asyncFunc() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputFile = yield (0, questions_1.askForFile)("Enter your input file: ");
        const file = fs_1.default.readFileSync(inputFile, 'ascii');
        const encryptOrDecrypt = yield (0, questions_1.askOptions)("Encrypt or decrypt: ", ["decrypt", "encrypt"]);
        const password = yield (0, questions_1.askPassword)("Enter password: ");
        for (let i = 0, passwordI = 0; i < file.length; i++, passwordI++) {
            const char = file.charAt(i);
            if (char === '\t' || char === '\n') {
                process.stdout.write(char);
                passwordI--;
                continue;
            }
            let passwordCode = password.charCodeAt(passwordI % password.length);
            let fileCode = file.charCodeAt(i);
            passwordCode -= 32;
            fileCode -= 32;
            let newFileCode;
            if (encryptOrDecrypt === 'encrypt') {
                newFileCode = fileCode + passwordCode;
            }
            else {
                newFileCode = (fileCode - passwordCode) + (127 - 32);
            }
            newFileCode = newFileCode % (127 - 32);
            newFileCode += 32;
            const newFileChar = String.fromCharCode(newFileCode);
            process.stdout.write(newFileChar);
        }
    });
}
asyncFunc();
