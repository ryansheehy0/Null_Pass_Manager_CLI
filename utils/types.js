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
