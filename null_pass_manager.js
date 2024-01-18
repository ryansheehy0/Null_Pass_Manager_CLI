#!/usr/bin/env node
"use strict";
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
const askForNewPassword_1 = require("./utils/askForNewPassword");
const questions_1 = require("./utils/questions");
const getLoginByName_1 = __importDefault(require("./utils/getLoginByName"));
const printLogin_1 = __importDefault(require("./utils/printLogin"));
const updateLoginByName_1 = __importDefault(require("./options/updateLoginByName"));
const deleteLoginByName_1 = __importDefault(require("./options/deleteLoginByName"));
const createNewLogin_1 = __importDefault(require("./options/createNewLogin"));
function getInputFilePath() {
    return __awaiter(this, void 0, void 0, function* () {
        let inputFilePath = yield (0, questions_1.askForFile)("Enter encrypted input file or give a folder location to create a new one: ");
        let inputFileStats;
        try {
            inputFileStats = fs_1.default.lstatSync(inputFilePath);
        }
        catch (error) {
            console.error();
            console.error("You must enter an encrypted json file or give a folder location. Please try again.");
            console.error();
            process.exit(1);
        }
        if (inputFileStats.isFile()) {
            try {
                // Check if the input file is a json file
                JSON.parse(fs_1.default.readFileSync(inputFilePath).toString());
            }
            catch (error) {
                console.error();
                console.error("Input file must be an encrypted json file. Please try again.");
                console.error();
                process.exit(1);
            }
        }
        else if (inputFileStats.isDirectory()) {
            const newFileName = yield (0, questions_1.askQuestion)("What's your new file name: ");
            try {
                fs_1.default.writeFileSync(inputFilePath + newFileName + ".json", "[]");
            }
            catch (error) {
                console.error();
                console.error("Something went wrong creating your new file. Please try again.");
                console.error();
                process.exit(1);
            }
            inputFilePath = inputFilePath + newFileName + ".json";
        }
        return inputFilePath;
    });
}
function getMasterPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            let masterPassword = yield (0, questions_1.askPassword)('Enter master password (128 characters) or type "g" to generate a new one: ');
            if (masterPassword === "g") {
                masterPassword = (0, askForNewPassword_1.generateRandomPassword)(128, true, true, true, false);
                console.log();
                console.log(`You new master password is: ${masterPassword}`);
                console.log(`	Make sure to securely save this password. Without it, you won't be able to retrieve future login information.`);
                console.log();
            }
            else {
                if (masterPassword.length !== 128) {
                    console.log();
                    console.log("Master password must be exactly 128 characters in length. Please try again.");
                    console.log();
                    continue;
                }
            }
            return masterPassword;
        }
    });
}
function userOptions(inputFilePath, masterPassword) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const options = [
            "Get login by name",
            "Create new login",
            "Update login by name",
            "Delete login by name",
            "Exit"
        ];
        while (true) {
            const option = yield (0, questions_1.askOptions)("What would you like to do: ", options);
            switch (option) {
                case "Get login by name":
                    (0, printLogin_1.default)((_a = (yield (0, getLoginByName_1.default)(inputFilePath, masterPassword))) === null || _a === void 0 ? void 0 : _a.login);
                    break;
                case "Create new login":
                    yield (0, createNewLogin_1.default)(inputFilePath, masterPassword);
                    break;
                case "Update login by name":
                    yield (0, updateLoginByName_1.default)(inputFilePath, masterPassword);
                    break;
                case "Delete login by name":
                    yield (0, deleteLoginByName_1.default)(inputFilePath, masterPassword);
                    break;
                case "Exit":
                    return;
            }
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get input file
        const inputFilePath = yield getInputFilePath();
        // Get master password
        const masterPassword = yield getMasterPassword();
        // Do what the user wants to do
        yield userOptions(inputFilePath, masterPassword);
    });
}
main();
