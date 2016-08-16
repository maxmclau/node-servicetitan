'use strict';

var assert = require('assert');
var request = require('request');
var Promise = require('bluebird');

var ServiceTitan = function(config) {
  if (!(this instanceof ServiceTitan)) {
    return new ServiceTitan(config);
  };

  var self = this;
  this.config = config;
};

/**
 * Get request shorthand
 *
 * @param {String} endpoint path
 * @param {Object} parameters sent with call
 * @return {Promise} request promise
 */
ServiceTitan.prototype.get = function (path, params) {
  return this.request('GET', path, params)
}

/**
 * Post request shorthand
 *
 * @param {String} endpoint path
 * @param {Object} parameters sent with call
 * @return {Promise} request promise
 */
ServiceTitan.prototype.post = function (path, params) {
  return this.request('POST', path, params)
}

/**
 * Request to api.servicetitan.com
 *
 * @param {String} request method
 * @param {String} endpoint path
 * @param {Object} parameters sent with call
 * @return {Promise} completion promise
 */
ServiceTitan.prototype.request = function (method, path, params) {
  var self = this;
  assert(method == 'GET' || method == 'POST');
  assert.notEqual(path, null);
  params = params || {};

  return new Promise(function (resolve, reject) {
    request({
      method : method,
      uri : 'https://api.servicetitan.com/v1' + path,
      headers : {
        'content-type' : 'application/json',
        'X-HTTP-ServiceTitan-Api-Key' : self.config.key
      },
      params: params
    }, function(err, res, body) {
      if(!err && res.statusCode == 200) {
        var res = JSON.parse(body);
        resolve(res);
      } else {
        reject(err);
      };
    });
  });
};

/**
 * Returns the name, email, and "doNotMail" flag.
 *
 * @param {Object} parameters sent with call
 * @return {Promise} request promise
 */
ServiceTitan.prototype.getCustomers = function(params) {
  return this.get('/customers', params);
};

module.exports = ServiceTitan;