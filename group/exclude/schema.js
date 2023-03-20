// SPDX-FileCopyrightText: 2022 Mix Irving
//
// SPDX-License-Identifier: LGPL-3.0-only

const { groupKey, tangle } = require('../definitions')

module.exports = {
  type: 'object',
  required: ['type', 'excludes', 'recps', 'tangles'],
  properties: {
    type: {
      type: 'string',
      pattern: '^group/exclude$'
    },
    excludes: {
      type: 'array',
      item: { $ref: '#/definitions/feedId' },
      minItems: 1,
      maxItems: 16
    },
    recps: {
      type: 'array',
      item: { $ref: '#/definitions/groupId' },
      minItems: 1,
      maxItems: 1
    },
    tangles: {
      type: 'object',
      required: ['group', 'members'],
      properties: {
        group: { $ref: '#/definitions/tangle/update' },
        members: { $ref: '#/definitions/tangle/update' }
      }
    }
  },
  additionalProperties: false,
  definitions: {
    ...groupKey,
    ...tangle.root
  }
}
