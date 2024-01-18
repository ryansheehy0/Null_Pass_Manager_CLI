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
Object.defineProperty(exports, "__esModule", { value: true });
const questions_1 = require("./questions");
function getProperty(property) {
    return __awaiter(this, void 0, void 0, function* () {
        const question = `Login's new ${property}: (max 64 characters)`;
        while (true) {
            let newProperty = property === "password" ? yield (0, questions_1.askPassword)(question) : yield (0, questions_1.askQuestion)(question);
            if (newProperty.length > 64) {
                console.log("The max length is 64 characters. Please try again.");
                continue;
            }
            return newProperty;
        }
    });
}
exports.default = getProperty;
