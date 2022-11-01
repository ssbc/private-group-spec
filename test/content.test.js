const test = require('tape')
const isValid = require('../').validator.group.content
const { GroupId, FeedId, MsgId } = require('./helpers')

const base = {
  type: 'potato',
  recps: [GroupId()],
  tangles: {
    group: {
      root: MsgId(),
      previous: [MsgId(), MsgId()]
    }
  }
}

test('private group message with custom content', (t) => {
  t.true(isValid(base), 'minimal')
  if (isValid.errors) throw isValid.errorsString

  t.false(isValid({ ...base, recps: [FeedId()] }), 'recp must be a group')

  t.false(
    isValid({ ...base, recps: [GroupId(), GroupId()] }),
    'can only send to 1 group'
  )

  t.true(
    isValid({
      ...base,
      content: { boop: 'adoop' },
      text: 'hello test post',
      mentions: ['hii', 'whatsup']
    }),
    'can have free form content'
  )

  t.true(
    isValid({
      ...base,
      tangles: {
        ...base.tangles,
        wiki: {
          root: MsgId(),
          previous: [MsgId(), MsgId(), MsgId()]
        }
      }
    }),
    'can have other tangles'
  )

  t.end()
})
