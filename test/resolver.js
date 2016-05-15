var expect = require('chai').expect
  , exec = require('child_process').exec
  , resolver = require('../dist/resolver.js');

describe('Sinopia Bower Proxy', function() {
    it('exports npm module', function() {
      expect(resolver).to.be.instanceof(Function);
    });

    var proxy = null;
    beforeEach(function() {
      proxy = resolver({});
    });

    describe('#match', function() {
      beforeEach(function() {
        proxy.config = {
          scopes: {}
        };
      });

      it('matches scopes list', function() {
        proxy.config = {
          scopes: {
            'npm': 'http://localhost:4873/'
          }
        };
        expect(proxy.match('@npm/jquery')).to.be.true;
        expect(proxy.match('jquery')).to.be.false;
      });

      it('matches without scopes list', function() {
        expect(proxy.match('@npm/jquery')).to.be.true;
        expect(proxy.match('jquery')).to.be.true;
      });
    });

    it('installs npm module', function() {
      var bower = exec('bower install --force', {
        cwd: 'test/assets/'
      });
      bower.stdout.on('data', function(data) {
        console.log(data);
      });
    });
});