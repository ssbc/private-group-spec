# Application for joining a group

This is about applications that are sent to group administrators and replied by them.

```js
var content = {
  type: 'group/application',
  version: 'v1',
  addMember: {
    add: '%3YUat1ylIUVGaCjotAvof09DhyFxE8iGbF6QxLlCWWc='
  },
  root: '%THxjTGPuXvvxnbnAV7xVuVXdhDcmoNtDDN0j3UTxcd8=.sha256',
  text: 'Accepted Ash son of Axuia ',                                      // optional
  recps: [
    '%vof09Dhy3YUat1ylIUVGaCjotAFxE8iGbF6QxLlCWWc=.cloaked',  // group_id
    '@YXkE3TikkY4GFMX3lzXUllRkNTbj5E+604AkaO1xbz8=.ed25519'   // feed_id (for new person)
  ],

  tangles: {
    application: {
      root: '%THxjTGPuXvvxnbnAV7xVuVXdhDcmoNtDDN0j3UTxcd8=.sha256',
      previous: [
        '%Sp294oBk7OJxizvPOlm6Sqk3fFJA2EQFiyJ1MS/BZ9E=.sha256'
      ]
    }
  }
}
```