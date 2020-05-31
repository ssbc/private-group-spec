# Direct messages

envelope can be used in the same way as box1 to send a message to n individuals.
(n will be defined by a common `max_attempts` - as in the maximum assumed number of 
`key_slots` for your application)

envelope also allows us to send messages to group and also to individuals at the same time.
This is particularly desireable in the case where we want to add a new person to a group
because the same message can simultaneously:
- give the new person the info needed to access the group
- reveal to the group that this action happened

## Computing the `recp_key`

We define a shared key that the sender + recipient can both derive:

```js
function computeDirectMessageKey (my_dh_secret, my_dh_public, your_dh_public, my_feed_tfk, your_feed_tfk) {
  var hash = 'SHA256'
  var length = 32
  var salt = SHA256("envelope-dm-v1-extract-salt")
  var info = slp_encode(
      ["envelope-ssb-dm-v1/key"]
      .concat(sort([
		tfk_encode(my_dh_public) || my_feed_tfk,
		tfk_encode(your_dh_public) || your_feed_tfk
  ])))
  var input_keying_material = scalarmult(my_dh_secret, your_dh_public)

  return hkdf(input_keying_material, length, {salt, info, hash})
}
```

The function arguments are:
- `my_dh_secret`: the own Diffie-Hellman secret key.
- `my_dh_public`: the own Diffie-Hellman public key.
- `your_dh_public`: the Diffie-Hellman public key of the communication partner.
- `my_feed_tfk`: the own Scuttlebutt feed ID in tfk format, as specified in TODO.
- `your_feed_tfk`: the Scuttlebutt feed ID in tfk format of the communication partner.

The constants we use are:
- `hash` is set to `SHA256`, such that HKDF uses SHA256 as underlying hash function.
- `length` is set to 32, such that the output keys are 32 bytes = 256 bits long.
- `salt` is set to `SHA256("envelope-dm-v1-extract-salt")`.

Furthermore, we require the following helper functions:
- `SHA256`: The SHA256 hash function
- `slp_encode`: Returns the shallow length prefix encoding of a tuple/list, [as defined in the envelope spec](https://github.com/ssbc/envelope-spec/blob/master/encoding/slp.md).
- `sort`: Sort an array. If the array elements are buffers, sort the elements such that any buffers `b1`, `b2` with leading bytes `b1[i] < b2[i]` are ordered such that `b1` appears before `b2`.
- `scalarmult`: for example, the curve25519 scalar multiplication function. As common in elliptic curve cryptography, we use additive group notation. Should the underlying Diffie-Hellman algorithms be exchanged, the call is substituted with the respective scalar multiplication or exponentiation function.
- `hkdf`: The HKDF function, as specified in [RFC 5869]
- `tfk_encode`: The binary encoding of keys, as specified in TODO

As a high level overview, we first compute the shared key between our secret key and the other public key.
Then, we derive a secret from it using HKDF.
The key derivation function takes four inputs: the input keying material, the key length, a salt and some additional info that ties the output key to the context.
A different info value will make the key derivation return a different value, even if the same input key is used.
This means the `info` variable can be used to tie the output key to the specific context of this call. 
That context is composed of several values.

Firstly, it contains a purpose identifying this particular key derivation.

Secondly, it contains the two Diffie-Hellman public keys whose shared secret is calculated, concatenated with the respective feed ID.
  We include the Diffie-Hellman public keys, because it is possible for two pairs `(skA, pkB), (skC, pkD)` to have scalar multiplication result in the same shared key `skA*pkB=skC*pkD`.
  By deriving based on the two public keys, we disambiguate which of the possible keys were used and return a different output key, respectively.
  Note that this can only happen if the attacker has access to the secret keys, but even under these circumstances we want to avoid the confusion that can arise from this.
  The feed IDs are included to avoid any confusion that could arise by an attacker reposting someone elses public keys.
  Concatenating them like this makes sure that the Diffie-Hellman public key and feed ID remain coupled.
  If we would concatenate them separately, it would not be immediately clear which Diffie-Helman public key belongs to which feed ID.
  Also, these two values are sorted.
  This means that the order in which they are supplied is not relevant for the output encoding, and both parties will always result at the same encoding and output key if they submit the same keys.

This way we
- specify the purpose of the key derivation
- specify the public keys whose shared secret is the input keying material
- specify the feed IDs of the parties for who the DM keys should be computed
- public keys and feed IDs are coupled, such that they can not be swapped

### Note:
We (curently) use the feed (signing) keys for this derivation. since these are `ed25519` keypairs that can't do Diffie-Hellman, we convert these to `curve25519` keypairs before doing scalarmult. In the medium term we intend to introduce messages that allow to override the own Diffie-Hellman public key used by others.

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

[RFC 5869]: https://tools.ietf.org/html/rfc5869
