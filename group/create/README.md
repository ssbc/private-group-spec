# Group create

This is a spec for how to initialise a new group.

Minimally, messages following this spec have `content` like

```js
var content = {
  type: 'group'
  name: { set: 'pacific butts consortium' },  // optional
  tangles: {
    group: {
      root: null,
      previous: null
    }
  }
}
```

Noticeablly, this first message **does not have a recps field** with this `group_id` in it,
because the definition of `group_id` depends on the key of this message, which will not
be known until this is published.

This means this initial message and it's content will need to be **manually boxed**,
with the only `recipient_key` being the symmetric `group_key` for this new group.

Do not be tempted to overload this initialisation message adding people to the group.
This would interfere with the [`entrust` spec](../entrust/README.md)

