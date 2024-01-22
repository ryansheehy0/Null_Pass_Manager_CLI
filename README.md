# Null Pass Manager CLI
A terminal password manager that uses a relatively simple encryption algorithm and securely stores it in a json file.

## Installation
1. Clone form github
1. Run `npm install`
1. Run `./null_pass_manager.js`

## Inputs
- Encrypted json file
- Master password which must be 128 random characters

## Commands
- Get login by name
- Create new login
- Update login by name
- Delete login by name

## Login and json file structure
Each login is an object with 5 fields
```javascript
{
  uuid:, // Universally Unique Identifier. Uniquely identifies the login
  name:, // Name of the website or account
  username:,
  password:,
  passwordLength: // Only 2 characters in length
}
```

Logins are stored in an array inside the json file

## Encryption algorithm

1. Split the master password in half. Each getting 64 characters. `password1stHalf` and `password2ndHalf`
1. For each login

```javascript
// name
const nameHash = hexSHA256(uuid + "name" + password1stHalf)
const encryptedName = simpleEncryption(simpleEncryption(name, nameHash, "encrypt"), password1stHalf, "encrypt")
  // decrypted
const name = simpleEncryption(simpleEncryption(encryptedName, password1stHalf, "decrypt"), nameHash, "decrypt")

// username
const usernameHash = hexSHA256(uuid + "username" + password1stHalf)
const encryptedUsername = simpleEncryption(simpleEncryption(username, usernameHash, "encrypt"), password1stHalf, "encrypt")
  // decrypted
const username = simpleEncryption(simpleEncryption(encryptedUsername, password1stHalf, "decrypt"), usernameHash, "decrypt")

// password
const passwordHash = hexSHA256(uuid + "password" + password2ndHalf)
const encryptedPassword = simpleEncryption(simpleEncryption(password, passwordHash, "encrypt"), password2ndHalf, "encrypt")
  // decrypted
const password = simpleEncryption(simpleEncryption(encryptedPassword, password2ndHalf, "decrypt"), passwordHash, "decrypt")

// password length
const passwordLengthHash = hexSHA256(uuid + "passwordLength" + password1stHalf)
const encryptedPasswordLength = simpleEncryption(simpleEncryption(passwordLength, passwordLengthHash, "encrypt"), password1stHalf, "encrypt")
  // decrypted. The last 2 characters contain the length
const passwordLength = simpleEncryption(simpleEncryption(encryptedPasswordLength, password1stHalf, "decrypt"), passwordLengthHash, "decrypt")
```

Why the inputs into the hash
- The `uuid` is to ensure the hash is different for each login
- The `"name"`, `"username"`, or `"password"` is to ensure the hash is different for each field incase the values of the fields are the same.
- The `password1stHalf` or `password2ndHalf` is to ensure an attacker cannot guess the hash.

### Visual example for each field

Encryption
```
                                                                                 value
hexSHA256(uuid + fieldName + passwordHalf) -> ~~~~~~~~~~~~~~~~~~hash~~~~~~~~~~~~~~~~~~
                    simpleEncryption(encrypt) ________________________________________
                                              ~~~~~~~~~~~~~~first layer~~~~~~~~~~~~~~~
                                              ~~~~~~~~~~~~~passwordHalf~~~~~~~~~~~~~~~
                    simpleEncryption(encrypt) ________________________________________
                                              ~~~~~~~~~~~~Encrypted Value~~~~~~~~~~~~~
```

Decryption
```
                                              ~~~~~~~~~~~~Encrypted Value~~~~~~~~~~~~~
                                              ~~~~~~~~~~~~~passwordHalf~~~~~~~~~~~~~~~
                    simpleEncryption(decrypt) ________________________________________
                                              ~~~~~~~~~~~~~~first layer~~~~~~~~~~~~~~~
hexSHA256(uuid + fieldName + passwordHalf) -> ~~~~~~~~~~~~~~~~~~hash~~~~~~~~~~~~~~~~~~
                    simpleEncryption(decrypt) ________________________________________
                                                                                 value
```

## Simple Encryption
Simple encryption is a symmetric stream encryption which takes in inputs in the visible ascii range and keeps the output in the visible ascii range.

`function simpleEncryption(input, password, encryptionOrDecryption)`

### Instructions
- Pad the start so input and password are the same length
- For each input and password character
  - Convert to ints using ascii
  - Subtract 32 from each
  - If encrypt
    - Add (input - 32) and (password - 32)
  - If decrypt
    - Subtract (input - 32) and (password - 32)
    - Add (127 - 32) to the result
  - Mod the result by (127 - 32)
  - Add 32 to the result
  - Convert result to a character using ascii
  - Push character to output array
- Return and convert output array to an output string

### Javascript example

```javascript
function simpleEncryption(input, password, encryptOrDecrypt){
  let outputs = []
  // Pad the start so input and password are the same length
  if(input.length > password.length){
    password = password.padStart(input.length, " ")
  }else if(input.length < password.length){
    input = input.padStart(password.length, " ")
  }
  // For each input and password character
  const inputs = input.split("")
  const passwords = password.split("")
  for(let i = 0; i < inputs.length; i++){
    let inputChar = inputs[i]
    let passwordChar = passwords[i]
    // Convert to ints using ascii
    inputChar = inputChar.charCodeAt(0)
    passwordChar = passwordChar.charCodeAt(0)
    // Subtract 32 from each
    inputChar -= 32
    passwordChar -= 32
    let outputChar
    // If encrypt
    if(encryptOrDecrypt === "encrypt"){
      // Add (input - 32) and (password - 32)
      outputChar = inputChar + passwordChar
    }
    // If decrypt
    if(encryptOrDecrypt === "decrypt"){
      // Subtract (input - 32) and (password - 32)
      outputChar = inputChar - passwordChar
      // Add (127 - 32) to the result
      outputChar += (127 - 32)
    }
    // Mod the result by (127 - 32)
    outputChar %= (127 - 32)
    // Add 32 to the result
    outputChar += 32
    // Convert result to a character using ascii
    outputChar = String.fromCharCode(outputChar)
    // Push character to output array
    outputs.push(outputChar)
  }
  // Return and convert output array to an output string
  return outputs.join("")
}
```

### Visual example

|           |      |
|:----------|:----:|
| Input:    | This |
| Password: | abca |

| Encrypt             |                     |                     |                     |
|---------------------|---------------------|---------------------|---------------------|
| T: 84 - 32 = 52     | h: 104 - 32 = 72    | i: 105 - 32 = 73    | s: 115 - 32 = 83    |
| a: 97 - 32 = 65     | b: 98  - 32 = 66    | c: 99  - 32 = 67    | a: 97  - 32 = 65    |
| 52 + 65 = 117       | 72 + 66 = 138       | 73 + 67 = 140       | 83 + 65 = 148       |
| 117 % (127-32) = 22 | 138 % (127-32) = 43 | 140 % (127-32) = 45 | 148 % (127-32) = 53 |
| 22 + 32 = 54        | 43 + 32 = 75        | 45 + 32 = 77        | 53 + 32 = 85        |
| 6                   | K                   | M                   | U                   |

| Decrypt             |                     |                     |                     |
|---------------------|---------------------|---------------------|---------------------|
| 6: 54 - 32 = 22     | K: 75 - 32 = 43     | M: 77 - 32 = 45     | U: 85 - 32 = 53     |
| a: 97 - 32 = 65     | b: 98  - 32 = 66    | c: 99  - 32 = 67    | a: 97  - 32 = 65    |
| 22 - 65 = -43       | 43 - 66 = -23       | 45 - 67 = -22       | 53 - 65 = -12       |
| -43 + (127-32) = 52 | -23 + (127-32) = 72 | -22 + (127-32) = 73 | -12 + (127-32) = 83 |
| 52 % (127-32) = 52  | 72 % (127-32) = 72  | 73 % (127-32) = 73  | 83 % (127-32) = 83  |
| 52 + 32 = 84        | 72 + 32 = 104       | 73 + 32 = 105       | 83 + 32 = 115       |
| T                   | h                   | i                   | s                   |

## Why split the master password in half
The reason the master password is split in half is to shift brute force attacks onto the websites instead of onto the encrypted file. It does this by encrypting the names and usernames separately from the passwords.

The first half of the password encrypts the name and username, which are assumed to be plain text. When decrypted they can be easily verified because they are typically recognizable names or words.

The second half of the password encrypts the password, which is assumed to be completely random. When decrypted it cannot be easily verified because they are random. They have to be verified by logging into the website itself.

If the name, username, and passwords were all encrypted with the same password then an attacker could infer a password is correct by verifying that the names and usernames are logical. They can infer the password is correct without verifying it on the website.

By keeping the password as a separate encryption, the information an attacker could obtain from a brute force attack is limited to identifying which websites the user has accounts on. To actually break into the user's account, the attacker would then need to conduct a brute force attack on the specific account itself, rather than the encrypted file.

## Why the need for a password length field
Some websites have limits on the size of passwords. If the max password length is less than 64 characters, then when the password is stored in the login it has to be padded in front. If this padding is spaces, then it would be easily identifiable.

Instead if the password length was stored alongside the password, the padding could be random characters which would prevent passwords from being easily identifiable.
