var expect = require('chai').expect
  , resolver = require('../dist/resolver.js');

describe('Sinopia Bower Proxy', function() {
    it('export npm module', function() {
      expect(resolver.default).to.be.instanceof(Function);
    });
});