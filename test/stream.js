"use strict";

const stream = require('readable-stream'),
	  client = require('../lib/stream.js');



var writable = new stream.Writable({
  objectMode : true,
  write: function(chunk, encoding, next) {
    console.log(chunk);
    next();
  }
});

writable.on('error', (error) => {
	console.log(error);
});


var foo = new client({key : ''});
foo.on('connect', () => {
	console.log('fooo');
});

foo.pipe(writable);


/*
foo.on('m', (msg) => {
	console.log(msg);
});
*/