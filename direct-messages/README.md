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

We define a shared key that the sender + recipient can both derive:

```js
function computeDirectMessageKey (my_secret, your_public) {
  var hash = 'SHA256'
  var salt = SHA256("envelope-direct-messsage-shared-key-extract-salt")
  var input_keying_material = scalarmult(my_secret, your_public)

  return hkdf.Extract(hash, salt, input_keying_material)
}
```

Notes:
- we (curently) use the primary feed keys for this derivation
- for feeds based on `ed25519` keypairs, we convert these to `curve25519` keypairs before doing scalarmult


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
  "proof-of-possession": "TBD"
}
```

The proof of possession is required to prevent [Unknown Key Share attacks]. [This RFC](https://tools.ietf.org/html/rfc6955) describes how we _could_ do it.

[Unknown Key Share attacks]: https://en.wikipedia.org/wiki/Unknown_key-share_attack

Questions:
- should this be part of a tangle, to clearly indicate succession of keys?
- change the salt when we do this?
- if we allow multiple of these keys, does that mean we have to try all keys from a person history?
- do we make a policy for "forgeting" past keys (e.g. n days after new one received)?

