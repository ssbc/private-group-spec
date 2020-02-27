# Private-Groups Spec (v1)

A specification for implementing private groups in scuttlebutt.

The fundamentals of this spec are:

1. uses _envelope_ for encryption of content
2. has group_ids which are safe to share publicly
3. adding people to the group is done with group's knowledge
4. supports disclosing of message content
    - **but this leaks info about the group** (peak at other messages / authors)

## envelope encryption in scuttlebutt

In adition to the envelope-spec, there are some scuttlebutt-specific specifications

[See spec here](./encryption/README.md)


## recipient key derivation

box1 took feedIds from the `content.recps` field and directly used these for encryption.

In envelope, we instead take "ids" from `content.recps`, and map each to a pair`{ key, key_type }` where":
- `key` is the shared key which we're going to a `key_slot`, and 
- `key_type` is the "key management schema" which that key is employing

Type of id            | How `key` is found                                 | `scheme`
----------------------|----------------------------------------------------|-----------------------------------------
private group id      | [a key-store](./group/group-id/README.md)          | "envelope-large-symmetric-group"
classic feedId        | [diff-hellman styles](./direct-messages/README.md) | "envelope-id-based-dm-converted-ed25519"
published private key | TODO                                               | "envelope-signed-dh-key-curve25519" ??

see `key-schemes.json` for the canonical list of accepted


## group management

A minimal amount of agreement to make coordination easier:
- [creating a new group](./group/init/README.md)
- [adding someone to your group](./group/add-member/README.md)


---

## TODO

describe
- how all these things might be woven together
- where state is tracked off-chain (in a key-store)


## scuttlebutt private-groups spec (v2)

Could modify this spec:
1. - same
2. - same
3. - same
4. supports privacy fiendly disclosing of message content
    - all internal cypherlinks are "cloaked"

