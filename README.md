# Private-Groups Spec (v1)

A specification for implementing private groups in scuttlebutt.

The fundamentals of this spec are:

1. uses box2 for encryption of content
2. has group_ids which are safe to share publicly
3. adding people to the group is done with group's knowledge
4. supports disclosing of message content
    - **but this leaks info about the group** (peak at other messages / authors)

## box2 encryption in scuttlebutt

In adition to the box2-spec, there are some scuttlebutt-specific specifications

[See spec here](./box2-encryption/README.md)


## Recipient Key derivation

box1 took feedIds from the `content.recps` field and directly used these for encryption.

In box2, we take these keys and **derive** a recipient key which is then passed into box2 `recp_keys`.

How keys are mapped:
- [cloaked `group_id`s](./group/group-id/README.md)
- [`feed_id`s]('./direct-messages/README.md')


## group management

A minimal amount of agreement to make coordination easier:
- [creating a new group](./group/create/README.md)
- [adding someone to your group](./group/entrust/README.md)


---


## scuttlebutt private-groups spec (v2)

Could modify this spec:
1. - same
2. - same
3. - same
4. supports privacy fiendly disclosing of message content
    - all internal cypherlinks are "cloaked"

