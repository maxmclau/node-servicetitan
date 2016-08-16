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
 * @param {String} query appended to path
 * @param {Object} parameters sent with call
 * @return {Promise} request promise
 */
ServiceTitan.prototype.get = function (path, qs, params) {
  return this.request('GET', path, qs, params)
}

/**
 * Post request shorthand
 *
 * @param {String} endpoint path
 * @param {String} query appended to path
 * @param {Object} parameters sent with call
 * @return {Promise} request promise
 */
ServiceTitan.prototype.post = function (path, qs, params) {
  return this.request('POST', path, qs, params)
}

/**
 * Request to api.servicetitan.com
 *
 * @param {String} request method
 * @param {String} endpoint path
 * @param {String} query appended to path
 * @param {Object} parameters sent with call
 * @return {Promise} completion promise
 */
ServiceTitan.prototype.request = function (method, path, qs, params) {
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
      qs: qs,
      params: params
    }, function(err, res, body) {
      if(!err && res.statusCode == 200) {
        var json = JSON.parse(body);
        resolve(json);
      } else  if(!err && res.statusCode == 404) {
        reject(body);
      } else {
        reject(err);
      };
    });
  });
};

/**
 * Return customer information with filters
 *
 * @param {Object} options specific to call
 * @param {Object} parameters sent with call
 * @return {Promise} request promise [request body]
 */
ServiceTitan.prototype.getCustomers = function(opt, params) {
  var qs = {};
  opt = opt || {};
  opt.id = opt.id || '';

  if(opt.id == '') { // If specific customer, then ignore filters
    qs["filter.name"]          = opt.name          || null;
    qs["filter.activeOnly"]    = opt.activeOnly    || null;
    qs["filter.createdAfter"]  = opt.createdAfter  || null;
    qs["filter.createdBefore"] = opt.createdBefore || null;
    qs["filter.page"]          = opt.page          || null;
    qs["filter.pageSize"]      = opt.pageSize      || null;
  };

  return this.get('/customers/' + opt.id, qs, params);
};

/**
 * Return job information with filters
 *
 * @param {Object} options specific to call
 * @param {Object} parameters sent with call
 * @return {Promise} request promise [request body]
 */
ServiceTitan.prototype.getJobs = function(opt, params) {
  var qs = {};
  opt = opt || {};
  opt.id = opt.id || '';

  if(opt.id == '') { // If specific customer, then ignore filters
    qs["filter.completedAfter"]   = opt.completedAfter   || null;
    qs["filter.completedBefore"]  = opt.completedBefore  || null;
    qs["filter.startsAfter"]      = opt.startsAfter      || null;
    qs["filter.startsBefore"]     = opt.startsBefore     || null;
    qs["filter.jobNumber"]        = opt.jobNumber        || null;
    qs["filter.customer"]         = opt.customer         || null;
    qs["filter.customerId"]       = opt.customerId       || null;
    qs["filter.location"]         = opt.location         || null;
    qs["filter.locationId"]       = opt.locationId       || null;
    qs["filter.invoiceNumber"]    = opt.invoiceNumber    || null;
    qs["filter.invoiceId"]        = opt.invoiceId        || null;
    qs["filter.technician"]       = opt.technician       || null;
    qs["filter.technicianId"]     = opt.technicianId     || null;
    qs["filter.jobTypeId"]        = opt.jobTypeId        || null;
    qs["filter.campaignId"]       = opt.campaignId       || null;
    qs["filter.businessUnitId"]   = opt.businessUnitId   || null;
    qs["filter.totalGreaterThan"] = opt.totalGreaterThan || null;
    qs["filter.totalLessThan"]    = opt.totalLessThan    || null;
    qs["filter.activeOnly"]       = opt.activeOnly       || null;
    qs["filter.createdAfter"]     = opt.createdAfter     || null;
    qs["filter.createdBefore"]    = opt.createdBefore    || null;
    qs["filter.page"]             = opt.page             || null;
    qs["filter.pageSize"]         = opt.pageSize         || null;
  };

  return this.get('/jobs/' + opt.id, qs, params);
};


module.exports = ServiceTitan;