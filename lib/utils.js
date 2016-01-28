"use strict";

const util = require('util');



/**
  * Error Object for generic or unclasified errors
  *
  * @param {Error} error An pre-existing Error Object to extend
  * @param {String} message A message to append to the Error Object
  * @param {String} type Which type of Error Object this should be
  * @returns {Error} an Error 
  */

module.exports.error = function (error, message, type) {
    if (!util.isError(error)) {
        error = new Error();
    }

    if (util.isString(message)) {
        error.message = message;
    }

    error.type = type ? type : 'GenericError';

    return error;
};
