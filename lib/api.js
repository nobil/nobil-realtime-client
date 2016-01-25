"use strict";

const request = require('request'),
      assert = require('assert');



const ApiClient = module.exports = function ApiClient (options) {

//     this.key = options.key;
    this.uri = 'http://realtime.nobil.no/api/v1/rest/';

};



ApiClient.prototype.getCharges = function (callback) {
    return request({
        method: 'get',
        json: true,
        uri: this.uri + 'chargers',
    }, function (error, response, body) {
        if (callback) return callback(error, body);
    });
};



ApiClient.prototype.getCharger = function (uuid, callback) {
    return request({
        method: 'get',
        json: true,
        uri: this.uri + 'charger/' + uuid
    }, function (error, response, body) {
        if (callback) return callback(error, body);
    });
};

