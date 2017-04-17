# AsyncAPI topic parser

It uses the [AsyncAPI topic structure definition](https://github.com/asyncapi/topic-definition) to manipulate topics.

#### #parse

```js
const parser = require('asyncapi-topic-parser');
console.log(parser.parse('hitch.email.1.0.action.user.welcome.send'));

// { org: 'hitch',
//   service: 'email',
//   version: '1.0',
//   versions: { major: '1', minor: '0' },
//   type: 'action',
//   resource: 'user.welcome',
//   resources: [ 'user', 'welcome' ],
//   subresource: 'welcome',
//   subresources: [ 'welcome' ],
//   operation: 'send',
//   status: undefined }
```
#### #stringify

```js
const parser = require('asyncapi-topic-parser');
const parsed = {
  org: 'hitch',
  service: 'email',
  version: '1.0',
  versions: { major: '1', minor: '0' },
  type: 'action',
  resource: 'user.welcome',
  resources: [ 'user', 'welcome' ],
  subresource: 'welcome',
  subresources: [ 'welcome' ],
  operation: 'send',
  status: 'done'
};
console.log(parser.stringify(parsed));

// hitch.email.1.0.action.user.welcome.send.done
```

## Author/s

<img src="https://avatars2.githubusercontent.com/u/242119?v=3&s=40" height="40" style="margin-right: 10px"/> Fran Mendez [<img src="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-social-twitter.svg" height="30" style="margin-left: 10px" />](https://www.twitter.com/fmvilas)
