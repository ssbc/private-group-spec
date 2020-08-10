# Direct messages

envelope can be used in the same way as box1 to send a message to n individuals.
(n will be defined by a common `max_attempts` - as in the maximum assumed number of 
`key_slots` for your application)

envelope also allows us to send messages to group and also to individuals at the same time.
This is particularly desireable in the case where we want to add a new person to a group
because the same message can simultaneously:
- give the new person the info needed to access the group
- reveal to the group that this action happened

## Mapping `feed_id` to a `recp_key`

There are two cases:
1. Remote feed - the `feed_id` is for another feed
2. Local feed - the `feed_id` is your own feed


### 1. Mapping `feed_id` to a `recp_key` | Remote feed

We define a shared key that the sender (us) + recipient can both derive:

```js
const hash = 'SHA256'
const length = 32
const salt = SHA256('envelope-dm-v1-extract-salt')

function directMessageKey (my_dh_secret, my_dh_public, my_feed_tfk, your_dh_public, your_feed_tfk) {
  var  input_keying_material = scalarmult(my_dh_secret, your_dh_public)

  var info_context = Buffer.from('envelope-ssb-dm-v1/key', 'utf8')
  var info_keys = sort([
    my_dh_public || my_feed_tfk,
    your_dh_public || your_feed_tfk
  ])
  var info = slp.encode([info_context, ...info_keys])

  return hkdf(input_keying_material, length, { salt, info, hash })
}
```

Notes:
- `(dh_secret, dh_public)` is some Diffie-Hellman compatible keypair to be used for encryption 
    - currently we take feed keys (`ed25519` signing keys) and convert these to keys compatible with diffie-hellman (dh) shared key encryption (`curve25119` keys)
    - in the future we plan to generate dh encryption keys seperately
- `feed_tfk` is the "id" of a feed, namely the public part of that feed's signing keypair, encoded in "type-format-key" format (see [TFK][TFK])
- `||` means Buffer concat
- `sort` means sort these 2 buffers bytewise so that the smallest is first
- `slp.encode` is "shallow length-prefixed encode" (see [SLP][SLP])
- the full key you try with a slot is of form `{ key, scheme: "envelope-id-based-dm-converted-ed25519" }`

### 2. Mapping `feed_id` to a `recp_key` | Local feed

A problem with sending a direct message to another feed is that once the message is enveloped, we don't have a record of
who the remote recipients were, so guessing which shared-key to derive (1) is hard.

A solution is to include out own `feed_id` as a recipient, and to always try a key we would have used on such messages.
We could in theory apply the same scheme as in (1), but this would involve us doing a scalar multiplaction of the public and private parts
of our key, which _should_ be safe, but we've decided not to do it.


Instead, when you see your own `feed_id` as a recipient, you're expected to **map that to a private symmetric key**.
Major advantages of this approach are:
- replies to original messages can use the same recps - makes coding more consistent
- this is compatible with multi-device identities - later I can send a copy of keys to other devices so they have access to the same DMs

Use a key of 32 bytes

Notes:
- the full key you try with a slot is of form `{ key, scheme: "envelope-symmetric-key-for-self" }`
- we considered using a "personal group", but this has the disadvantages:
    - makes replies hard - remote feeds do not know how to map your personal `group_id` to a symmetric key, so...?
    - includes un-cloaked tangle info about the group, which may leak private info (e.g. feeds / devices you don't want known)

---


## Using `feed_id`

It's safe to use `feed_id` anywhere in public (as these are already public).

In the context of `content.recps` we use `feed_id` so that other recipients can see who
was included in the message, but for the envelope `recp_key` we map the `feed_id` to a `shared_dm_key`
using the above definition

```js
var content = {
  //...
  recps: [
    '%g/JTmMEjG4JP2aQAO0LM8tIoRtNkTq07Se6h1qwnQKb=.cloaked',
    '@YjoQc7sLF/ye+QM09iPcDJdzQo3lQD6YvQIFhmNbEqg=.ed25519'  // << a feed_id
  ]
}
```


---

## Future

In the future we might publish direct-message keys to our feeds directly.
This would allow things like key-cycling, and is more proveably secure
(than converting our primary feed keys)

Notes for that possible future:

Possible direct message public key update message draft:
```
{
  "type": "dm-key",
  "key": "<base64>",
  "keyType": "curve25519", // or cv25519?
}
```

Questions:
- should this be part of a tangle, to clearly indicate succession of keys?
- change the salt when we do this?
- if we allow multiple of these keys, does that mean we have to try all keys from a person history?
- do we make a policy for "forgeting" past keys (e.g. n days after new one received)?


[SLP]: https://github.com/ssbc/envelope-spec/blob/master/encoding/slp.md
[TFK]: https://github.com/ssbc/envelope-spec/blob/master/encoding/tfk.md
