const Validator = require('is-my-ssb-valid')

const groupInitSchema = require('./group/init/schema.json')
const groupAddMemberSchema = require('./group/add-member/v2/schema.json')
// NOTE group/add-member at v2 (for v1 see ./group/add-member/v1/schema.json)
const groupContentSchema = require('./group/content/schema.json')

module.exports = {
  constants: {
    directMessages: require('./direct-messages/constants.json'),
    poBox: require('./po-box/constants.json')
  },
  schema: {
    group: {
      init: groupInitSchema,
      addMember: groupAddMemberSchema,
      content: groupContentSchema
    }
  },
  validator: {
    group: {
      init: Validator(groupInitSchema),
      addMember: Validator(groupAddMemberSchema),
      content: Validator(groupContentSchema)
    }
  },
  keySchemes: require('./key-schemes.json').scheme
}
