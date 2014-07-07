# mCAP CLI

Commandline Interface to generate mCAP Applications

## Install

```
git clone https://github.com/mwaylabs/mcapcli.git
cd mcapcli
npm install
```

or

```
npm install mcapcli
```

## Usage

```
node index.js [options]

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