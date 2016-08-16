var assert       = require('assert');
var expect       = require("chai").expect;

var key          = process.env.API_KEY;
assert(key, null, 'API_KEY not set');

var servicetitan = require('./../lib/index')({
  key : key
});

describe("[customers]", function() {
  it("should successfully execute GET /customers (getCustomers)", function(next) {
    servicetitan
      .getCustomers(function(err, res) {
        assert.equal(err, null);

        next();
      });
  });
});