"use strict";

const Client = require('../').Api,
      stream = require('readable-stream'),
      utils = require('../lib/utils.js'),
      nock = require('nock'),
      tap = require('tap');


const mockAll = [{
    uuid: "FIN_01626",
    status: 2,
    connectors: [
        {
            status: 0,
            error: 1,
            timestamp: 1448537045000
        }
    ]
},
{
    uuid: "FIN_03093",
    status: -1,
    connectors: [
        {
            status: -1,
            error: 0,
            timestamp: -1
        }
    ]
}];

const mockCharger = {
    uuid: "NOR_01523",
    status: 0,
    connectors: [
        {
            status: 0,
            error: 0,
            timestamp: 1453835318000
        },
        {
            status: 0,
            error: 0,
            timestamp: 1453820917000
        },
        {
            status: 0,
            error: 0,
            timestamp: 1453845397000
        },
        {
            status: 0,
            error: 0,
            timestamp: 1453836517000
        },
        {
            status: 0,
            error: 0,
            timestamp: 1453843121000
        }
    ]
};



tap.test('api() - options object not provided - result should throw assert error', (t) => {
    t.throws(() => {
        let client = new Client();
    }, new Error('you must pass an options object'));
    t.end();
});


tap.test('api() - key parameter not provided - result should throw assert error', (t) => {
    t.throws(() => {
        let client = new Client({});
    }, new Error('you must pass an api key on the options object'));
    t.end();
});


tap.test('api() - option object with key provided - result should be an Object', (t) => {
    t.type(new Client({key:'somekey'}), 'object');
    t.end();
});


tap.test('api() - option object with key provided - .key should be what we provided on the option object', (t) => {
    let client = new Client({key:'somekey'});
    t.equal(client.key, 'somekey');
    t.end();
});


tap.test('api() - option object without uri provided - .uri should be internal value', (t) => {
    let client = new Client({key:'somekey'});
    t.equal(client.uri, 'http://realtime.nobil.no/api/v1/rest');
    t.end();
});


tap.test('api() - option object with uri provided - .uri should be what we provided on the option object', (t) => {
    let client = new Client({
        key:'somekey',
        uri:'http://localhost:8080/mock/server'
    });
    t.equal(client.uri, 'http://localhost:8080/mock/server');
    t.end();
});


tap.test('.getChargers() - get all - callback should hold an array of chargers on the second attribute', (t) => {
    let scope = nock('http://realtime.nobil.no')
                    .get('/api/v1/rest/chargers')
                    .reply(200, mockAll);

    let client = new Client({key:'somekey'});
    client.getChargers((error, result) => {
        t.similar(result, mockAll);
        t.end();        
    });
});


tap.test('.getCharger() - provide valid charger id - callback should hold one charger on the second attribute', (t) => {
    let scope = nock('http://realtime.nobil.no')
                    .get('/api/v1/rest/charger/NOR_01523')
                    .reply(200, mockCharger);

    let client = new Client({key:'somekey'});
    client.getCharger('NOR_01523', (error, result) => {
        t.similar(result, mockCharger);
        t.end();        
    });
});





tap.test('.getCharger() - provide wrongly formated charger id - callback should hold "Error" on first attribute and "undefined on second"', (t) => {
    let scope = nock('http://realtime.nobil.no')
                    .get('/api/v1/rest/charger/NOR_0')
                    .reply(400, {status : '400 - Bad request'});
    
    let client = new Client({key:'somekey'});
    client.getCharger('NOR_0', (error, result) => {
        t.ok(error instanceof Error);
        t.equal(result, undefined);
        t.end();        
    });
});






tap.test('.getCountry() - provide valid country id - callback should hold an array of chargers on the second attribute', (t) => {
    let scope = nock('http://realtime.nobil.no')
                    .get('/api/v1/rest/chargers/FIN')
                    .reply(200, mockAll);

    let client = new Client({key:'somekey'});
    client.getCountry('FIN', (error, result) => {
        t.similar(result, mockAll);
        t.end();        
    });
});
