"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterPassword = exports.EncryptedLogins = exports.EncryptedLogin = exports.Login = void 0;
const zod_1 = require("zod");
exports.Login = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string().max(64),
    username: zod_1.z.string().max(64),
    password: zod_1.z.string().max(64),
    passwordLength: zod_1.z.number().lte(64).int()
});
exports.EncryptedLogin = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    encryptedName: zod_1.z.string().max(64),
    encryptedUsername: zod_1.z.string().max(64),
    encryptedPassword: zod_1.z.string().max(64),
    encryptedPasswordLength: zod_1.z.string().max(2)
});
exports.EncryptedLogins = exports.EncryptedLogin.array();
exports.MasterPassword = zod_1.z.string().length(128);
