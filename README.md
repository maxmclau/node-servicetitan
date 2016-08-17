# node-servicetitan
[![Build Status](https://travis-ci.org/maxmclau/node-servicetitan.svg?branch=master)](https://travis-ci.org/maxmclau/node-servicetitan) [![npm version](https://badge.fury.io/js/servicetitan.svg)](https://badge.fury.io/js/servicetitan) [![npm version](https://david-dm.org/maxmclau/node-servicetitan.svg)](https://github.com/maxmclau/node-servicetitan/blob/master/package.json)

Node Servicetitan is a node.js wrapper for the [go.servicetitan.com](https://servicetitan.com/) api.

#### Installation

```bash
npm install servicetitan
```

#### Usage
```js
'use strict';

var st = require('servicetitan')({
  key : '00000000-0000-0000-0000-000000000000'
});

st
  .getCustomers(function(err, res) {
    console.log(res.);
  })
  .then(function() {
    console.log('Complete');
  })
  .catch(function(err) {
    console.log('Error');
  });
```

#### Test
```bash

API_KEY="00000000-0000-0000-0000-000000000000" npm test
```
