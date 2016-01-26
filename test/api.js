"use strict";

const Client = require('../').Api,
	  stream = require('readable-stream'),
	  nock = require('nock'),
      tap = require('tap');



tap.test('options object not provided - result should throw assert error', (t) => {
    t.throws(() => {
        let client = new Client();
    }, new Error('you must pass an options object'));
    t.end();
});


tap.test('key parameter not provided - result should throw assert error', (t) => {
    t.throws(() => {
        let client = new Client({});
    }, new Error('you must pass an api key on the options object'));
    t.end();
});


tap.test('option object with key provided - result should be an Object', (t) => {
    t.type(new Client({key:'somekey'}), 'object');
    t.end();
});


tap.test('option object without uri provided - .uri should be http://realtime.nobil.no/api/v1/rest', (t) => {
    var  client = new Client({key:'somekey'});
    t.equal(client.uri, 'http://realtime.nobil.no/api/v1/rest');
    t.end();
});




/*
var foo = new Client();


foo.getCharger('NOR_01523', function (error, body) {
    console.log(body);
});


foo.getCharges(function (error, body) {
    console.log(body);
});

foo.getCountry('NOR', function (error, body) {
    console.log(body);
});
*/
