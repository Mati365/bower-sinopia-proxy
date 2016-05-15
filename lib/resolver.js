'use strict';
import fs from 'fs';
import _ from 'lodash';
import request from 'request-promise';
import tmp from 'tmp';

const DEFAULT_CONFIG = {
    server: 'http://registry.npmjs.org'
  , scopes: {
    'npm': 'http://localhost:4873'
  }
};

class Resolver {
  constructor(bower, config) {
    this.bower = bower;
    this.config = config || DEFAULT_CONFIG;
  }

  getSourceScope(source) {
    let scope = _.find(
        _.keys(this.config.scopes)
      , (scope) => _.startsWith(source, `@${scope}/`)
    );
    return scope && this.config.scopes[scope];
  }

  match(source) {
    return !!this.config.server || !!this.getSourceScope(source);
  }

  releases(source) {
    let libName = source.replace(/\@.*\//i, '')
      , uri = (this.getSourceScope(source) || this.config.server) + '/' + libName;

    const mapData = (data) => (
      _.map(data['versions'], (el) => {
        return {
            target: el.dist.tarball
          , version: el.version
        };
      })
    );
    return request({
        uri
      , headers: {'User-Agent': 'Bower-sinopia-proxy'}
      , json: true
    })
      .then(mapData);
  }

  fetch(endpoint, cached) {
    if(cached && cached.version)
      return;

    let tempDir = tmp.dirSync()
      , file = fs.createWriteStream(`${tempDir.name}/archive-${Math.random().toString(36).substring(7)}.tgz`);

    http.get(endpoint.target, function(response) {
      // console.log(response);
      // response.pipe(file);
    });
    // return {
    //     tempPath: tempDir.name
    //   , removeIgnores: true
    // };
  }

  static instance(bower, config) {
    if(!bower)
      throw new Error('Bower instance must be object!');
    // todo: Init config from cli parameter
    return new Resolver(bower, config);
  }
}

export default Resolver.instance;