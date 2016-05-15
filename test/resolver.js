var expect = require('chai').expect
  , exec = require('child_process').exec
  , resolver = require('../dist/resolver.js');

describe('Sinopia Bower Proxy', function() {
    it('exports npm module', function() {
      expect(resolver).to.be.instanceof(Function);
    });

    var proxy = null;
    beforeEach(function() {
      proxy = resolver({}, {
          server: 'http://localhost:4873'
        , scopes: {
          'test': 'http://registry.npmjs.org'
        }
      });
    });

    describe('#match', function() {
      it('matches scopes list', function() {
        expect(proxy.match('@test/jquery')).to.be.true;
        expect(proxy.match('jquery')).to.be.true;
      });

      it('matches without scopes list', function() {
        proxy.config.scopes = {};

        expect(proxy.match('@test/jquery')).to.be.true;
        expect(proxy.match('jquery')).to.be.true;
      });
    });

    describe('#releases', function() {
      it('find release', function() {
        // proxy.releases('@test/jquery').then(function(d) {
        //   console.log(d);
        // });
        // expect(proxy.locate('@test/jquery')).to.be.equal({
        //     name: 'jquery'
        //   , packageInfo: ''
        // });
      });
    });

    it('installs npm module', function() {
      var bower = exec('bower install --force', {
        cwd: __dirname + '/assets/'
      });
      bower.stdout.on('data', function(data) {
        console.log(data);
      });
    });
});