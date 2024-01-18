"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const crypto_1 = __importDefault(require("crypto"));
const OutputSchema = zod_1.z.coerce.string().length(64);
function hexSHA256(input) {
    const hash = crypto_1.default.createHash("sha256");
    hash.update(input);
    const hashOutput = hash.digest("hex");
    return OutputSchema.parse(hashOutput);
}
exports.default = hexSHA256;
