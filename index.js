const Validator = require('is-my-ssb-valid')

// NOTE some at v2 (for v1 see ./group/${type}/v1/schema.json)
const groupInitRootSchema = require('./group/initRoot/v2/schema.json')
const groupInitEpochSchema = require('./group/initEpoch/v2/schema.json')
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
      initRoot: groupInitRootSchema,
      initEpoch: groupInitEpochSchema,
      addMember: groupAddMemberSchema,
      content: groupContentSchema,
      exclude: groupExcludeSchema
    }
  },
  validator: {
    group: {
      initRoot: Validator(groupInitRootSchema),
      initEpoch: Validator(groupInitEpochSchema),
      addMember: Validator(groupAddMemberSchema),
      content: Validator(groupContentSchema),
      exclude: Validator(groupExcludeSchema)
    }
  },
  keySchemes: require('./key-schemes.json').scheme
}
