module.exports = {
  constants: {
    directMessages: require('./direct-messages/constants.json'),
    poBox: require('./po-box/constants.json')
  },
  schema: {
    group: {
      init: require('./group/init/schema.json'),
      addMember: require('./group/add-member/schema.json')
    }
  },
  keySchemes: require('./key-schemes.json').scheme
}
