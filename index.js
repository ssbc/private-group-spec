const Validator = require('is-my-ssb-valid')

// NOTE some at v2 (for v1 see ./group/${type}/v1/schema.json)
const groupInitSchema = require('./group/init/v2/schema.json')
const groupAddMemberSchema = require('./group/add-member/v2/schema.json')
const groupContentSchema = require('./group/content/schema.json')
const groupExcludeSchema = require('./group/exclude/schema.json')

module.exports = {
  constants: {
    directMessages: require('./direct-messages/constants.json'),
    poBox: require('./po-box/constants.json')
  },
  schema: {
    group: {
      init: groupInitSchema,
      addMember: groupAddMemberSchema,
      content: groupContentSchema,
      exclude: groupExcludeSchema
    }
  },
  validator: {
    group: {
      init: Validator(groupInitSchema),
      addMember: Validator(groupAddMemberSchema),
      content: Validator(groupContentSchema),
      exclude: Validator(groupExcludeSchema)
    }
  },
  keySchemes: require('./key-schemes.json').scheme
}
