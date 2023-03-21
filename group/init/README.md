# Creating a group

This is a spec for how to initialise a new group as well as a new epoch.

:warning: schema.json is generated so don't modify it directly

## Group init example

Notably, the first message **does not have a recps field** with this `group_id` in it,
because the definition of `group_id` depends on the key of this message, which will not
be known until this is published.

This means this initial message and it's content will need to be **manually boxed**,
with the `recipient_key`s being the symmetric `group_key` for this new group as well as to your `own_key`, for recovery purposes.

Do not be tempted to overload this initialisation message.
Adding people to the group would interfere with the [`add-member` spec](../add-member/README.md)

Here's how you initialise a group in the current JS stack

```js
// assume you already know your feedId + prevMsgId for this feed
var feedId = 'ssb:feed/bendybutt-v1/-oaWWDs8g73EZFUMfW37R_ULtFEjwKN_DczvdYihjbU='
var prevMsgId = 'ssb:message/classic/Zz-Inkte70Qz1UVKUHIhOgo16Oj_n37PfgmIzLDBgZw=.sha256'

var feed_id = ... BFE binary encoding of feed_id
var prev_msg_id = ... BFE binary encoding of feed_id

var group_key = {
  key: group_buffer, // group_buffer is symmetric key as buffer
  scheme: 'envelope-large-symmetric-group'
}
var own_key = {
  key: own_buffer, // own_buffer is a symmetric key as a buffer
  scheme: 'envelope-symmetric-key-for-self'
}
var msg_key =  ... make up a one use key for the msg as a buffer

// here's the unencrypted init message
var plainText = {
  type: 'group/init'
  version: 'v2',
  groupKey: group_key.toString('base64'),
  tangles: {
    group: {
      root: null,
      previous: null
    },
    epoch: {
      root: null,
      previous: null
    }
    members: {
      root: null,
      previous: null
    }
  }
}

var plain_text = .... stringify + buffer

var ciphertext = envelope(plain_text, feed_id, prev_msg_id, msg_key, [ group_key, own_key ])

// what you publish (enveloped plaintext)
// ciphertext = "SDSDsadlksajda432wdfsdlkfja=.box2"
```

## Epoch init example

```js
const groupRoot = 'ssb:message/classic/Zz-Inkte70Qz1UVKUHIhOgo16Oj_n37PfgmIzLDBgZw=.sha256'
const groupId = 'ssb:identity/group/g_JTmMEjG4JP2aQAO0LM8tIoRtNkTq07Se6h1qwnQKb='

var plainText = {
  type: 'group/init'
  version: 'v2',
  groupKey: group_key.toString('base64'),
  tangles: {
    group: {
      root: groupRoot,
      previous: [lastMessageOnPreviousEpoch]
    },
    epoch: {
      root: groupRoot,
      previous: [groupRoot]
    }
    members: {
      root: null,
      previous: null
    }
  },
  recps: [groupId, myRootFeedId]
}
```

Note the differences between the root msg (the "zero epoch") and epoch init messages:
* The group tangle is not null and like normal, points at the group root and the latest messages.
* The epoch tangle is not null and points at the root msg as well as the init for the last epoch. In this example this is the first new epoch so the `previous` is the group root msg.
* The members tangle is always null in "group/init" messages, since that tangle is reset there.
* Recps is defined, and includes the group id as well as your own root feed id.