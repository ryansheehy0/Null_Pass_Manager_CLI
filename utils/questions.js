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
exports.askCheckbox = exports.askYesOrNo = exports.askOptions = exports.askPassword = exports.askForFile = exports.askQuestion = void 0;
const fs_1 = __importDefault(require("fs"));
//import inquirer from 'inquirer'
const inquirer = require('inquirer');
//import autocomplete from 'inquirer-autocomplete-prompt'
const autocomplete = require('inquirer-autocomplete-prompt');
inquirer.registerPrompt('autocomplete', autocomplete);
function suggestFiles(answers, input) {
    // This function gets the options for file tab autocompletion
    let directory; // The directory to be searched
    let search; // What's to be searched in the directory
    let beforeOptions; // What's displayed in front of the options
    if (!input) {
        directory = "./";
        search = "";
        beforeOptions = "";
    }
    else {
        if (input.at(-1) === "/") {
            directory = input;
            search = "";
            beforeOptions = directory;
        }
        else {
            if (input.includes("/")) {
                // Ex: input = ../../file.json
                // search = file.json
                // directory = ../../
                const inputs = input.split("/");
                search = inputs.pop();
                directory = inputs.join("/") + "/";
                beforeOptions = directory;
            }
            else {
                directory = "./";
                search = input;
                beforeOptions = "";
            }
        }
    }
    try {
        return fs_1.default.readdirSync(directory)
            .map(option => beforeOptions + option)
            .filter(file => file.includes(search));
    }
    catch (error) {
        return [""]; // Prevent question from ending if there is an error
    }
}
function questionTemplate(type, question, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { answer } = yield inquirer.prompt([{
                type: type,
                name: "answer",
                message: question,
                choices: options,
                source: type === "autocomplete" ? suggestFiles : undefined,
                suggestOnly: true,
            }]);
        return answer;
    });
}
function askQuestion(question) {
    return __awaiter(this, void 0, void 0, function* () { return yield questionTemplate("input", question); });
}
exports.askQuestion = askQuestion;
function askForFile(question) {
    return __awaiter(this, void 0, void 0, function* () { return yield questionTemplate("autocomplete", question); });
}
exports.askForFile = askForFile;
function askPassword(question) {
    return __awaiter(this, void 0, void 0, function* () { return yield questionTemplate("password", question); });
}
exports.askPassword = askPassword;
function askOptions(question, options) {
    return __awaiter(this, void 0, void 0, function* () { return yield questionTemplate("list", question, options); });
}
exports.askOptions = askOptions;
function askYesOrNo(question) {
    return __awaiter(this, void 0, void 0, function* () { return yield questionTemplate("confirm", question); });
}
exports.askYesOrNo = askYesOrNo;
function askCheckbox(question, options) {
    return __awaiter(this, void 0, void 0, function* () { return yield questionTemplate("checkbox", question, options); });
}
exports.askCheckbox = askCheckbox;
