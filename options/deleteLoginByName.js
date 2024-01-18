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
const getLoginByName_1 = __importDefault(require("../utils/getLoginByName"));
const printLogin_1 = __importDefault(require("../utils/printLogin"));
function deleteLoginByName(inputFilePath, masterPassword) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { login, loginIndex, encryptedLogins } = (_a = yield (0, getLoginByName_1.default)(inputFilePath, masterPassword)) !== null && _a !== void 0 ? _a : {};
        if (login === undefined || loginIndex === undefined || encryptedLogins === undefined)
            return;
        (0, printLogin_1.default)(login);
        encryptedLogins.splice(loginIndex, 1);
        fs_1.default.writeFileSync(inputFilePath, JSON.stringify(encryptedLogins, null, 2));
    });
}
exports.default = deleteLoginByName;
