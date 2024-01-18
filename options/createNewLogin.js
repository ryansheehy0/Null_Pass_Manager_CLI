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
const crypto_1 = __importDefault(require("crypto"));
const encrypt_1 = __importDefault(require("../cryptography/encrypt"));
const askForNewPassword_1 = __importDefault(require("../utils/askForNewPassword"));
const askForProperty_1 = __importDefault(require("../utils/askForProperty"));
function createNewLogin(inputFilePath, masterPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedLogins = JSON.parse(fs_1.default.readFileSync(inputFilePath).toString());
        const newLogin = {
            uuid: crypto_1.default.randomUUID(),
            name: yield (0, askForProperty_1.default)("name"),
            username: yield (0, askForProperty_1.default)("username"),
            password: yield (0, askForNewPassword_1.default)(),
            passwordLength: 0
        };
        newLogin.passwordLength = newLogin.password.length;
        const newEncryptedLogin = (0, encrypt_1.default)(newLogin, masterPassword);
        encryptedLogins.push(newEncryptedLogin);
        fs_1.default.writeFileSync(inputFilePath, JSON.stringify(encryptedLogins, null, 2));
    });
}
exports.default = createNewLogin;
