const fs = require('fs')
const Validator = require('is-my-ssb-valid')
const definitions = require('./group/definitions/schema.json')
const initSchema = require('./group/init/schema.json')
const addMemberSchema = {
  ...require('./group/add-member/partialSchema.json'),
  definitions
}
fs.writeFileSync(
  './group/add-member/schema.json',
  JSON.stringify(addMemberSchema, null, 2)
)
const contentSchema = {
  ...require('./group/content/partialSchema.json'),
  definitions
}
fs.writeFileSync(
  './group/content/schema.json',
  JSON.stringify(contentSchema, null, 2)
)

module.exports = {
  constants: {
    directMessages: require('./direct-messages/constants.json'),
    poBox: require('./po-box/constants.json')
  },
  schema: {
    group: {
      init: initSchema,
      addMember: addMemberSchema,
      content: contentSchema
    }
  },
  validator: {
    group: {
      init: Validator(initSchema),
      addMember: Validator(addMemberSchema),
      content: Validator(contentSchema)
    }
  },
  keySchemes: require('./key-schemes.json').scheme
}
