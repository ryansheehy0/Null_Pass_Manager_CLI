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

module.exports = simpleEncryption