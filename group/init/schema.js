// SPDX-FileCopyrightText: 2022 Mix Irving
//
// SPDX-License-Identifier: LGPL-3.0-only

const { tangle } = require('../definitions')

module.exports = {
  type: 'object',
  required: [
    'type',
    'tangles'
  ],
  properties: {
    type: {
      type: 'string',
      pattern: '^group/init$'
    },
    tangles: {
      type: 'object',
      required: ['group'],
      properties: {
        group: { $ref: '#/definitions/tangle/root' }
      }
    }
  },
  additionalProperties: false,
  definitions: {
    ...tangle.root
  }
}
