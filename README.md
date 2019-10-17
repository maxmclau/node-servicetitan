## node-servicetitan
[![NPM Version](http://img.shields.io/npm/v/servicetitan.svg?style=flat-square)](https://badge.fury.io/js/servicetitan)
[![Build Status](http://img.shields.io/travis/maxmclau/node-servicetitan/master.svg?style=flat-square)](https://travis-ci.org/maxmclau/node-servicetitan)
[![Dependency Status](http://img.shields.io/david/maxmclau/node-servicetitan.svg?style=flat-square)](https://github.com/maxmclau/node-servicetitan/blob/master/package.json)

Node.js wrapper for the [go.servicetitan.com](https://servicetitan.com/) api.

#### Installation

```bash
$ npm install servicetitan
```

#### Usage
```js
'use strict';

var st = require('servicetitan')({
  key : '00000000-0000-0000-0000-000000000000'
});

st.getCustomers({
    id : 0
  })
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.log('Error');
  });
```

#### Test
```bash
$ export API_KEY="00000000-0000-0000-0000-000000000000"
$ npm test 
```
