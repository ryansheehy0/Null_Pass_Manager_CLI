"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function simpleEncryption(input, password, encryptOrDecrypt) {
    let outputs = [];
    // Pad the start so input and password are the same length
    if (input.length > password.length) {
        password = password.padStart(input.length, " ");
    }
    else if (input.length < password.length) {
        input = input.padStart(password.length, " ");
    }
    // For each input and password character
    const inputs = input.split("");
    const passwords = password.split("");
    for (let i = 0; i < inputs.length; i++) {
        const inputChar = inputs[i];
        const passwordChar = passwords[i];
        // Convert to ints using ascii
        let inputCharCode = inputChar.charCodeAt(0);
        let passwordCharCode = passwordChar.charCodeAt(0);
        // Subtract 32 from each
        inputCharCode -= 32;
        passwordCharCode -= 32;
        let outputCharCode;
        if (encryptOrDecrypt === "encrypt") {
            // Add (input - 32) and (password - 32)
            outputCharCode = inputCharCode + passwordCharCode;
        }
        else {
            // Subtract (input - 32) and (password - 32)
            outputCharCode = inputCharCode - passwordCharCode;
            // Add (127 - 32) to the result
            outputCharCode += (127 - 32);
        }
        // Mod the result by (127 - 32)
        outputCharCode %= (127 - 32);
        // Add 32 to the result
        outputCharCode += 32;
        // Convert result to a character using ascii
        const outputChar = String.fromCharCode(outputCharCode);
        // Push character to output array
        outputs.push(outputChar);
    }
    // Return and convert output array to an output string
    return outputs.join("");
}
exports.default = simpleEncryption;
