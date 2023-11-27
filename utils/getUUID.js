function getUUID(logins){
  if(logins.length === 0) return 0

  // Get all the uuids of the logins
  const loginUUIDs = logins.map(login => {
    return login.uuid
  })
  // Make new uuid
  const newUUID = Math.max(...loginUUIDs) + 1
  return newUUID
}

module.exports = getUUID