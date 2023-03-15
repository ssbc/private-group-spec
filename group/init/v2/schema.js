// SPDX-FileCopyrightText: 2022 Mix Irving
//
// SPDX-License-Identifier: LGPL-3.0-only

const { groupKey, tangle } = require('../../definitions')

module.exports = {
  type: 'object',
  required: ['type', 'version', 'groupKey', 'tangles'],
  properties: {
    type: {
      type: 'string',
      pattern: '^group/init$'
    },
    version: {
      type: 'string',
      pattern: '^v2$'
    },
    groupKey: { $ref: '#/definitions/groupKey' },
    tangles: {
      type: 'object',
      required: ['group', 'members'],
      properties: {
        group: { $ref: '#/definitions/tangle/root' },
        members: { $ref: '#/definitions/tangle/root' }
      }
    }
  },
  additionalProperties: false,
  definitions: {
    ...groupKey,
    ...tangle.root
  }
}