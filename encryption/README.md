# box2 encryption

## Example

For a "classic" feed (ed25519 keys, json encoding, a messages following this spec look like:

```js
var msg = {
  key: "%THxjTGPuXvvxnbnAV7xVuVXdhDcmoNtDDN0j3UTxcd8=.sha256",
  value: {
    previous: "%Tq07Se6h1qwnQKbg/JTmMEjG4JP2aQAO0LM8tIoRtNk=.sha256",
    author: "@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519",
    sequence: 29048,
    timestamp: 1581539387846,
    hash: "sha256",
    content: "d01U1de...cSAajGGGz9K/CoAhdjz2DzfgonOfzArB/1q/Bg==.box2", // <<<
    signature: "kPwB4e0...6oj+yjiMhuKH5iFMS8wOQCBV3SvmlAw==.sig.ed25519"
  }
}
```

Note the `msg.value.content` is of form `<base64>.box2`

See the [box2-spec](https://github.com/ssbc/box2-spec) for how to derive this ciphertext, noting:
- `feed_id` is a binary encoding of `msg.value.author` (see `box2-spec/encoding/tfk.md`)
- `prev_msg_id` is a binary encoding of `msg.value.previous` (see `box2-spec/encoding/tfk.md`)
  - if `previous` is `null`, encode the key part of `prev_msg_id` as a zero-filled buffer of the same length you'd normally have (for that type/format combo)
- the box2-spec returns the ciphertext as a Buffer, while in this layers we:
  - encode that as a base64 encoded string
  - suffix it with `.box2` as a clear signal for unboxers
  
Before encryption the content of this message looked like:

```js
var content = {
  type: 'announcment',
  text: "I'm having a pool party, y'all should come over Saturday!",
  recps: [
    '%g/JTmMEjG4JP2aQAO0LM8tIoRtNkTq07Se6h1qwnQKb=.cloaked', // a cloaked group_id
    '@YjoQc7sLF/ye+QM09iPcDJdzQo3lQD6YvQIFhmNbEqg=.ed25519'  // a feed_id
  ]
}
```

After boxing this becomes:

```js
var ciphertext = "d01U1depQ...CoAhdjz2DzfgonOfzArB/1q/Bg==.box2"
```

Reminder: boxing takes into account further context than just the content (`feed_id` + `prev_msg_id`)

## Vectors

Scenarios:

- vector1: unboxing a message from a person you're in some groups with
- vector2: unboxing a direct message
- vector3: creating a boxed content to a group + individual
