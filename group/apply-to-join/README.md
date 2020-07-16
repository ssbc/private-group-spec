# Applying to join a group

This is about applying to join a group.

```js
var content = {
  type: 'group/apply-to-join',
  version: 'v1',
  groupId: '3YUat1ylIUVGaCjotAvof09DhyFxE8iGbF6QxLlCWWc=',
  root: '%THxjTGPuXvvxnbnAV7xVuVXdhDcmoNtDDN0j3UTxcd8=.sha256',
  text: 'Hi kaitiaki, I am Ash son of Auxia, can I join?',                                      // optional
  recps: [
    '@Io9Yu78kY4GFMX3lzXUllRkNTbj5E+604AkaO1xJJz8=.ed25519', // kaitiaki feedId
    '@P0kcetMokY4GFMX3lzXUllRkNTbj5E+604AkaO1888U=.ed25519', // kaitiaki 2 feedId
    '@YXkE3TikkY4GFMX3lzXUllRkNTbj5E+604AkaO1xbz8=.ed25519'  // application sender feedId
  ],

  tangles: {
    application                          : {
      root: '%THxjTGPuXvvxnbnAV7xVuVXdhDcmoNtDDN0j3UTxcd8=.sha256',
      previous: [
        '%Sp294oBk7OJxizvPOlm6Sqk3fFJA2EQFiyJ1MS/BZ9E=.sha256'
      ]
    }
  }
}
```