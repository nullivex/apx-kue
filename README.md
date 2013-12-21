apx-kue [![Build Status](https://travis-ci.org/snailjs/apx-kue.png?branch=master)](https://travis-ci.org/snailjs/apx-kue)
=======

Kue initializer and job handler for APX API server

## Usage

Simply add the initializer to the Apx config.

```
$ npm install apx apx-kue
```

```js
var APX = require('apx')
var inst = APX({
  initializers: 'apx-kue'
})
```

## Configuration

### Host
* Variable `kue.host`
* Required **no**
* Default `null`

Hostname for the kue web interface to listen on

### Port
* Variable `kue.port`
* Required **no**
* Default `3001`

Port for kue web interface to listen on

### Redis

#### Host
* Variable `kue.redis.host`
* Required **no**
* Default `null`

Redis Hostname uses the redis default otherwise

#### Port
* Variable `kue.redis.port`
* Required **no**
* Default `null`

Redis Port uses the redis default otherwise

#### Password
* Variable `kue.redis.password`
* Required **no**
* Default `null`

Password used to authenticate with redis

## Changelog

### 0.1.0
* Initial release
