'use strict';
import _ from 'lodash';

const DEFAULT_CONFIG = {
  scopes: {
    'npm': 'http://localhost:4873/'
  }
};

class Resolver {
  constructor(bower, config) {
    this.bower = bower;
    this.config = config || DEFAULT_CONFIG;
  }

  match(path) {
    if(_.isEmpty(this.config.scopes))
      return true;

    if(path)
      return _.some(
          _.keys(this.config.scopes)
        , (scope) => _.startsWith(path, `@${scope}/`)
      );
    return false;
  }

  static instance(bower) {
    if(!bower)
      throw new Error('Bower instance must be object!');
    // todo: Init config from cli parameter
    return new Resolver(bower, DEFAULT_CONFIG);
  }
}

export default Resolver.instance;