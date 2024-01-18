"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printLogin(login) {
    if (!login)
        return;
    const printedLogin = {
        name: login.name.trim(),
        username: login.username.trim(),
        password: login.password.substring(64 - login.passwordLength)
    };
    console.log();
    console.log(printedLogin);
    console.log();
}
exports.default = printLogin;
