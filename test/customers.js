var assert       = require('assert');
var expect       = require("chai").expect;

var key          = process.env.API_KEY;
assert(key, null, 'API_KEY not set');

var st           = require('./../lib/index')({
  key : key
});

describe("[customers]", function() {
  it("should successfully execute GET /customers (getCustomers)", function(next) {
    st
      .getCustomers()
      .then(function(res) {
        console.log(res);
      next();
    });
  });
});