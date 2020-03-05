module.exports = {
  schema: {
    group: {
      init: require('./group/init/schema.json'),
      addMember: require('./group/add-member/schema.json')
    }
  },
  keySchemes: require('./key-schemes.json')
}
