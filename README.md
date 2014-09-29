# mCAP CLI
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

Commandline Interface to generate mCAP Applications

## Install

```
git clone https://github.com/mwaylabs/mcap-cli.git
cd mcap-cli
npm install
```

or

```
npm install mcap-cli
```

## Usage

```
cli.js [options]

   Options:

    -h, --help               output usage information
    -V, --version            output the version number
    info                     Display the configuration and information
    new                      generates a skeletal mCAP Application in the current directory
    example                  Creates a mcap example application. Which shows a applications which is using push, security and dataSync
    server <add> [alias]     Add a server configuration
    server <remove> [alias]  Remove a server configuration
    server <info> [alias]    See the server configuration
    server <list>            List all server
    log [alias]              Live logger of the given server
    generate <component>     Generate a mCAP Component, components: bikini, connectionconfiguration, model, rest, saprfc, soap, sql


```

## Test

```
tap test/*.js
```

[npm-url]: https://npmjs.org/package/mcap-cli
[npm-image]: https://badge.fury.io/js/mcap-cli.svg
[travis-url]: https://travis-ci.org/mwaylabs/mcap-cli
[travis-image]: https://travis-ci.org/mwaylabs/mcap-cli.svg?branch=master
[daviddm-url]: https://david-dm.org/mwaylabs/mcap-cli.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/mwaylabs/mcap-cli
[coveralls-url]: https://coveralls.io/r/mwaylabs/mcap-cli
[coveralls-image]: https://coveralls.io/repos/mwaylabs/mcap-cli/badge.png