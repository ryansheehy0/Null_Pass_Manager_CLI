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
const types_1 = require("./types");
const fs_1 = __importDefault(require("fs"));
const decrypt_1 = __importDefault(require("../cryptography/decrypt"));
const questions_1 = require("./questions");
function getLoginByName(inputFilePath, masterPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedLogins = JSON.parse(fs_1.default.readFileSync(inputFilePath).toString());
        types_1.EncryptedLogins.parse(encryptedLogins);
        let logins = [];
        for (const encryptedLogin of encryptedLogins) {
            const login = (0, decrypt_1.default)(encryptedLogin, masterPassword);
            logins.push(login);
        }
        if (logins.length === 0) {
            console.log();
            console.log("You have no logins.");
            console.log();
            return;
        }
        const loginOptions = logins.map((login) => {
            return { name: login.name.trim(), value: login.uuid };
        });
        while (true) {
            const loginUUID = yield (0, questions_1.askOptions)("Select name of login: ", loginOptions);
            const loginIndex = logins.findIndex((login) => login.uuid === loginUUID);
            const login = logins[loginIndex];
            if (!login) {
                console.log("Not an option. Please try again.");
                continue;
            }
            return { login, loginIndex, encryptedLogins };
        }
    });
}
exports.default = getLoginByName;
