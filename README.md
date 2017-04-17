# AsyncAPI topic parser

It uses the [AsyncAPI topic structure definition](https://github.com/asyncapi/topic-definition) to manipulate topics.

## Installation

```
npm install --save asyncapi-topic-parser
```

## Documentation

#### #parse

It takes a topic in string format and generates an object which describes the topic.

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

It takes an object which describes the topic and generates a topic in string format.

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

Fran Mendez &nbsp;&nbsp;[<img src="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-social-twitter.svg" height="20" /> @fmvilas](https://www.twitter.com/fmvilas)
