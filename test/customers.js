var assert       = require('assert');
var expect       = require("chai").expect;

var key          = process.env.API_KEY;
assert(key, null, 'API_KEY not set');

var st           = require('./../lib/index')({
  key : key
});

describe("[customers]", function() {
  it("should successfully execute GET /customers/ (getCustomers)", function(next) {
    st
      .getCustomers()
      .then(function(res) {
        assert.notEqual(res.data[0].id, null);

        next();
      });
  });
});

describe("[customers]", function() {
  it("should successfully execute GET /customers/:id (getCustomers)", function(next) {
    st
      .getCustomers({
        id : 10301
      })
      .then(function(res) {
        assert.notEqual(res.data.id, null);

        next();
      });
  });
});