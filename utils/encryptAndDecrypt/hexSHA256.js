const crypto = require("crypto")

function hexSHA256(input){
  const hash = crypto.createHash("sha256")
  hash.update(input)
  return hash.digest("hex")
}

module.exports = hexSHA256