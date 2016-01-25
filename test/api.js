"use strict";

const stream = require('readable-stream'),
      Client = require('../lib/api.js');




var writable = new stream.Writable({
  objectMode : true,
  write: function(chunk, encoding, next) {
    console.log(chunk);
    next();
  }
});


var foo = new Client();

// foo.getCharger('NOR_01523').pipe(writable);
/*
foo.getCharger('NOR_01523', function (error, body) {
    console.log(body);
});
*/

foo.getCharges(function (error, body) {
    console.log(body);
});
