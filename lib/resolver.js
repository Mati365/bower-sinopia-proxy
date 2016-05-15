'use strict';
import _ from 'lodash';
import tmp from 'tmp';

import rp from 'request-promise';
import tarball from 'tarball-extract';

const DEFAULT_CONFIG = {
    server: 'http://registry.npmjs.org'
  , scopes: {
    'local': 'http://localhost:4873'
  }
};

class Resolver {
  constructor(bower) {
    this.bower = bower;
    this.config = (bower.config && bower.config.sinopiaProxyConfig) || DEFAULT_CONFIG;
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
    return rp({
        uri
      , headers: {'User-Agent': 'Bower-sinopia-proxy'}
      , json: true
    })
      .then(mapData);
  }

  fetch(endpoint, cached) {
    if(cached && cached.version)
      return;

    let tempDir = tmp.dirSync().name;
    return new Promise((resolve, reject) => {
      tarball.extractTarballDownload(
          endpoint.target
        , `${tempDir}/package.tgz`
        , `${tempDir}/extracted_package/`
        , {}
        , (err, info) => {
          if(err)
            reject(err);
          else
            resolve({
                tempPath: `${tempDir}/extracted_package/package`
              , removeIgnores: true
            });
        });
    });
  }

  static instance(bower) {
    if(!bower)
      throw new Error('Bower instance must be object!');
    // todo: Init config from cli parameter
    return new Resolver(bower);
  }
}

export default Resolver.instance;