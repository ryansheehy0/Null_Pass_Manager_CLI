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
exports.generateRandomPassword = void 0;
const zod_1 = require("zod");
const questions_1 = require("./questions");
const crypto_1 = __importDefault(require("crypto"));
const askForProperty_1 = __importDefault(require("./askForProperty"));
function generateRandomPassword(length, hasUpperCaseCharacters, hasNumbers, hasSpecialCharacters, hasSpaces) {
    const lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/";
    let usableCharacters = lowerCaseCharacters;
    if (hasUpperCaseCharacters)
        usableCharacters += upperCaseCharacters;
    if (hasNumbers)
        usableCharacters += numbers;
    if (hasSpecialCharacters)
        usableCharacters += specialCharacters;
    if (hasSpaces)
        usableCharacters += " ";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto_1.default.randomInt(usableCharacters.length);
        password += usableCharacters[randomIndex];
    }
    return password;
}
exports.generateRandomPassword = generateRandomPassword;
function askForNewGeneratedPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const newPasswordLength = parseInt(yield (0, questions_1.askQuestion)("Password length: (max 64 characters)"));
            if (!zod_1.z.number().int().lte(64).safeParse(newPasswordLength).success) {
                console.log("The max length is 64 characters. Please try again.");
                continue;
            }
            const newPasswordOptions = [
                "Upper Case Characters",
                "Numbers",
                "Special Characters",
                "Spaces"
            ];
            const selectedOptions = yield (0, questions_1.askCheckbox)("What characters do you want in your password: ", newPasswordOptions);
            const newGeneratedPassword = generateRandomPassword(newPasswordLength, selectedOptions.includes("Upper Case Characters"), selectedOptions.includes("Numbers"), selectedOptions.includes("Special Characters"), selectedOptions.includes("Spaces"));
            console.log();
            console.log(newGeneratedPassword);
            console.log();
            return newGeneratedPassword;
        }
    });
}
function askForNewPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        const generateNewPassword = yield (0, questions_1.askYesOrNo)("Do you want to generate a new password: ");
        let newPassword;
        if (generateNewPassword) {
            newPassword = yield askForNewGeneratedPassword();
        }
        else {
            newPassword = yield (0, askForProperty_1.default)("password");
        }
        return newPassword;
    });
}
exports.default = askForNewPassword;
