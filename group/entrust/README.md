# Entrust

This is about adding people to your group

```js
var content = {
  type: 'entrust'
  groupKey: '3YUat1ylIUVGaCjotAvof09DhyFxE8iGbF6QxLlCWWc=',
  initialMsg: '%96fE4lECuncfo8cMQHBWU0WpAx+cIq7A8NHFSzbxLTM=.sha256',
  text: 'welcome keks!',                                                // optional
  recps: [
    '%vof09Dhy3YUat1ylIUVGaCjotAFxE8iGbF6QxLlCWWc=.cloaked',
    '@YXkE3TikkY4GFMX3lzXUllRkNTbj5E+604AkaO1xbz8=.ed25519'
  ],

  tangles: {
    group: {
      root: '%THxjTGPuXvvxnbnAV7xVuVXdhDcmoNtDDN0j3UTxcd8=.sha256',
      previous: [
        '%Sp294oBk7OJxizvPOlm6Sqk3fFJA2EQFiyJ1MS/BZ9E=.sha256'
      ]
    },
    membership: {
      root: '%xnbnAV7xVuVXdhTHxjTGPuXvvDcmoNtDDN0j3UTxcd8=.sha256',
      previous: [
        '%lm6Sqk3fFJA2EQFiyJ1MS/BZ9E=.sha256',
        '%Sp294oBk7OJxizvPOlm6Sqk3fFJA2EQFiyJ1MS/BZ9E=.sha256'
      ]
    }
  }
}
```

Notes:
- `recps` must include the `group_id` and a `feed_id` (one or more)
  - this ensures that everyone has the same info about who's been added
  - if including multiple, keep in mind `max_attempts` of your application
- all messages in the group are part of that groups tangle (see `tangles.group`)
  - this makes it possible to query things based on group (e.g. was this in my europe or pacifica group?)
  - provides partial ordering for all activity in the group
- all `entrust` type messages are part of the membership tangle (see `tangles.membership`)
  - this makes it easy to build a history of additions to the group
- all tangles info is "uncloaked" in this version of the spec
  - i.e. sharing this message content leaks info about what other messages/ authors are in the group
