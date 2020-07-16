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
    '@Io9Yu78kY4GFMX3lzXUllRkNTbj5E+604AkaO1xJJz8=.ed25519', // kaitiaki feedId
    '@P0kcetMokY4GFMX3lzXUllRkNTbj5E+604AkaO1888U=.ed25519', // kaitiaki 2 feedId
    '@YXkE3TikkY4GFMX3lzXUllRkNTbj5E+604AkaO1xbz8=.ed25519'  // application sender feedId
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