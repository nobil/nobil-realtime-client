"use strict";

const request = require('request'),
      assert = require('assert'),
      utils = require('./utils.js'),
      is = require('core-util-is');



const ApiClient = module.exports = function ApiClient (options) {

    assert(options && is.isObject(options), 'you must pass an options object');
    assert(options.key && is.isString(options.key), 'you must pass an api key on the options object');

    this.key = options.key;
    this.uri = options.uri || 'http://realtime.nobil.no/api/v1/rest';
};



/** 
  * Retrieve all chargers in the realtime database
  *
  * @param {function} callback containing the result
  * @returns {Object} the request Object (writable stream)
  */

ApiClient.prototype.getChargers = function (callback) {
    return request({
        method: 'get',
        json: true,
        uri: this.uri + '/chargers',
    }, (error, response, body) => {
        if (callback) return callback(error, body);
    });
};



/** 
  * Retrieve a single charger
  *
  * @param {String} uuid the id of the charger to retrieve
  * @param {function} callback a callback containing the result
  * @returns {Object} the request Object (writable stream)
  */


ApiClient.prototype.getCharger = function (uuid, callback) {
    return request({
        method: 'get',
        json: true,
        uri: this.uri + '/charger/' + uuid
    }, (error, response, body) => {
        if (response.statusCode === 400) return callback(utils.error(null, 'UUID is badly formated'), undefined);
        if (callback) return callback(error, body);
    });
};



/** 
  * Retrieve all chargers in a country
  *
  * @param {String} country the country code of the country to retrieve all chargers from
  * @param {function} callback a callback containing the result
  * @returns {Object} the request Object (writable stream)
  */

ApiClient.prototype.getCountry = function (country, callback) {
    return request({
        method: 'get',
        json: true,
        uri: this.uri + '/chargers/' + country
    }, (error, response, body) => {
        if (callback) return callback(error, body);
    });
};
