# bower-sinopia-proxy
[![npm](https://img.shields.io/npm/v/bower-sinopia-proxy.svg?style=flat)](https://www.npmjs.com/package/bower-sinopia-proxy)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](http://opensource.org/licenses/MIT)

Simple bower resolver that helps with downloading NPM packages using Bower.

## Installation
```
npm install -g bower-sinopia-proxy
```

## Configuration
**example .bowerrc**
```
{
  "resolvers": [
    "bower-sinopia-proxy"
  ],
  "sinopia-proxy-config": {
    "server": "http://registry.npmjs.org",
    "scopes": {
      "local": "http://localhost:4873"
    }
  }
}
```

**example bower.json**
```
...
"dependencies": {
  "@local/backbone": "~1.3.3",
  "@local/underscore": "~1.8.3",
  "localforage": "~1.4.0",
  "is_js": "~0.7.6"
}
...
```
## License
The MIT License (MIT)

Copyright (c) 2016/2017 Mateusz Bagiński
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

