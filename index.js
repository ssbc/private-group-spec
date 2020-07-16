module.exports = {
  constants: {
    directMessages: require('./direct-messages/constants.json')
  },
  schema: {
    group: {
      init: require('./group/init/schema.json'),
      addMember: require('./group/add-member/schema.json'),
      applyToJoin: require('./group/apply-to-join/schema.json'),
      application: require('./group/application/schema.json')
    }
  },
  keySchemes: require('./key-schemes.json').scheme
}
