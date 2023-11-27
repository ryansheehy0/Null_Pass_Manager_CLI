function ascii(char) {
  return char.charCodeAt(0);
}

function asciiToChar(code) {
  return String.fromCharCode(code);
}

function simpleEncryption(input1, input2, isEncryption){
  // input1 and input2 have to be the same length
  // input1 and input2 can't have tabs or new lines
  const input1Array = input1.split("")
  const input2Array = input2.split("")
  let outputArray = []

  for(let i = 0; i < input1Array.length; i++){
    let input1Code = ascii(input1Array[i]) - 32
    let input2Code = ascii(input2Array[i]) - 32
    let newCharCode
    if(isEncryption){
      newCharCode = input1Code + input2Code
    }else{ // Decryption
      newCharCode = input1Code - input2Code
      newCharCode += 127 - 32
    }
    newCharCode %= 127 - 32
    newCharCode += 32

    outputArray.push(asciiToChar(newCharCode))
  }

  return outputArray.join("")
}

module.exports = simpleEncryption