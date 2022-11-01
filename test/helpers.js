const crypto = require('crypto')

const key = () =>
  crypto
    .randomBytes(32)
    .toString('base64')
    .replaceAll('/', '_')
    .replaceAll('+', '-')

const GroupId = () => `ssb:identity/group/${key()}`
const FeedId = () => `ssb:feed/classic/${key()}`
const MsgId = () => `ssb:message/classic/${key()}`

module.exports = {
  key,
  GroupId,
  FeedId,
  MsgId
}
