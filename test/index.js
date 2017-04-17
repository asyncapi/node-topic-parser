const assert = require('assert');
const parser = require('../');

describe('Parser', () => {
  describe('#parse', () => {
    it('parses a topic without status', () => {
      const parsed = parser.parse('hitch.email.1.0.action.user.welcome.send');
      assert.equal(parsed.org, 'hitch');
      assert.equal(parsed.service, 'email');
      assert.equal(parsed.versions.major, '1');
      assert.equal(parsed.versions.minor, '0');
      assert.equal(parsed.type, 'action');
      assert.equal(parsed.resource, 'user.welcome');
      assert.equal(parsed.subresource, 'welcome');
      assert.equal(parsed.operation, 'send');
      assert.equal(parsed.status, undefined);
    });

    it('parses a topic with status', () => {
      const parsed = parser.parse('hitch.email.1.0.action.user.welcome.send.done');
      assert.equal(parsed.org, 'hitch');
      assert.equal(parsed.service, 'email');
      assert.equal(parsed.versions.major, '1');
      assert.equal(parsed.versions.minor, '0');
      assert.equal(parsed.type, 'action');
      assert.equal(parsed.resource, 'user.welcome');
      assert.equal(parsed.subresource, 'welcome');
      assert.equal(parsed.operation, 'send');
      assert.equal(parsed.status, 'done');
    });
  });

  describe('#stringify', () => {
    it('stringifies a valid object without status', () => {
      const parsed = {
        org: 'hitch',
        service: 'email',
        versions: {
          major: 1,
          minor: 0
        },
        type: 'action',
        resources: ['user', 'welcome'],
        operation: 'send'
      };

      assert.equal(parser.stringify(parsed), 'hitch.email.1.0.action.user.welcome.send');
    });

    it('stringifies a valid object with status', () => {
      const parsed = {
        org: 'hitch',
        service: 'email',
        versions: {
          major: 1,
          minor: 0
        },
        type: 'action',
        resources: ['user', 'welcome'],
        operation: 'send',
        status: 'done'
      };

      assert.equal(parser.stringify(parsed), 'hitch.email.1.0.action.user.welcome.send.done');
    });
  });
});
