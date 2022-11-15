const { messageId, feedId, groupId, tangle } = require('../definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: [
    'type',
    'version',
    'groupKey',
    'root',
    'recps',
    'tangles'
  ],
  properties: {
    type: {
      type: 'string',
      pattern: '^group/add-member$'
    },
    version: {
      type: 'string',
      pattern: '^v1$'
    },
    groupKey: {
      type: 'string',
      pattern: '^[a-zA-Z0-9\\/+]{42}[AEIMQUYcgkosw048]=$'
    },
    root: { $ref: '#/definitions/messageId' },
    text: { type: 'string' },
    recps: {
      type: 'array',
      items: [
        { $ref: '#/definitions/groupId' }
      ],
      additionalItems: { $ref: '#/definitions/feedId' },
      minItems: 2,
      maxItems: 16
    },
    tangles: {
      type: 'object',
      required: [
        'group',
        'members'
      ],
      properties: {
        group: { $ref: '#/definitions/tangle/update' },
        members: { $ref: '#/definitions/tangle/update' }
      }
    }
  },
  additionalProperties: false,
  definitions: {
    ...messageId,
    ...feedId,
    ...groupId,
    ...tangle.update
  }
}
