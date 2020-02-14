# Group Id

We want to be able to mention a group without revealing info about it.
We'll also use this `group_id` in the `recps` field, and when we go to publish a message,
map that `group_id` into that groups symmetric keys (`group_key`) which we then use for box2 encryption

**Properties we want**
- leaks nothing about the group _e.g. who started it, where it started_
- can be used by those who know about the group to look up the associated key

## Definition

The `group_id` is defined as:

```
var info = ["ssb-derive-cloaked-msg-id", init_msg_id]
var group_id = HKDF.Expand(group_key, encode(info), 32)
```

where:
- `init_msg_id` is the id of the message which initialised the group, in a binary type-format-key encoding (see `box2-spec/encoding/tfk.md`)
- `group_key` is the groups secret (symmetric) key
- `encode` is shallow-length-prefix encode (see `box2-spec/encoding/slp.md`)


## Using `group_id`

Because what this id is referencing is obfuscated, it's safe to use in public 
(e.g. refernece or link to it from a public post)

We also use this in the `content.recps` field of classic messages.

```js
var content = {
  //...
  recps: [
    '%g/JTmMEjG4JP2aQAO0LM8tIoRtNkTq07Se6h1qwnQKb=.cloaked', // << a cloaked group_id
    '@YjoQc7sLF/ye+QM09iPcDJdzQo3lQD6YvQIFhmNbEqg=.ed25519'
  ]
}
```


This provides a _little_ obfuscation about the group for any recipients of the message,
but primarily the primary intention is to make this the canonical (safe) reference handle for a group.
This make it less likely for programmers to be tempted to reference the root message id and copy
that to an unsafe (public) context.

### Mapping a `group_id` to a `group_key`

If we're using `group_id` in `recps`, then we need a way to map this to the key we'll use for boxing.

When you're entrusted with access to a private group, you will receive:
- the location of the initial message for that group
- the `group_key` for that group

This will allow you to derive the `group_id` for that group (using definition above).
You will need to keep an index which will allow you map `group_id` to `group_key` so that when you see
a `recps` field containing the cloaked `group_id` you'll know which shared key to include in box2 `recp_keys`


## Design Considerations

1. the parts you could identify a group uniquely by are: 
    - it's `group_key` : this is only know by people who are "in the group". This makes it a good candidate for contributing to the identifier, but we can't use it raw, otherwise mentioning it publicly could accidentally leak access to the group.
    - it's `init_msg_id` : message ids are public, so if there was a public mention of a group you could see if running some DeriveGroupId on all message ids you have to try and discover starts of groups. This alone is can't be used to derive `group_id`.
2. this definition binds the id of the group to a particular `group_key`, which might make "key-cycling" weird
    - maybe this is good, the ID probably should reflect the current key in use
    - it would make uniquely referencing a group which had change it's key (and hence `group_id`) harder... you'd have to store a range of aliases for a group
    - we don't know if we'd do cycling of keys anyway...
3. this means the `group_id` is bound to the feed
    - it can't be set / determined until a group initialisation message is published
