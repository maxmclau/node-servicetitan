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

ServiceTitan.prototype.get = function (path, params, callback) {
  return this.request('GET', path, params, callback)
}

ServiceTitan.prototype.post = function (path, params, callback) {
  return this.request('POST', path, params, callback)
}

ServiceTitan.prototype.request = function (method, path, params, callback) {
  var self = this;
  assert(method == 'GET' || method == 'POST');

  if (typeof params === 'function') {
    callback = params
    params = {}
  };
  assert(typeof callback === 'function');

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

        callback(err, res)
      } else {
        reject(err);
      };
    });
  });
};

ServiceTitan.prototype.getCustomers = function(params, callback) {
  return this.request('GET', '/customers', params, callback);
};

module.exports = ServiceTitan;