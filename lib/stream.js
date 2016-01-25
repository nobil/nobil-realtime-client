"use strict";

const Readable = require('readable-stream').Readable,
      Recovery = require('recovery'),

      assert = require('assert'),
      util = require('util'),
      url = require('url'),
      is = require('core-util-is'),
      ws = require('ws');



const StreamClient = module.exports = function StreamClient (options) {

    assert(options && is.isObject(options), 'you must pass an options object');
    assert(options.key && is.isObject(options.key), 'you must pass an api key on the options object');


    Readable.call(this, {objectMode : true});
    // this.socket = new ws(url.format(options.url));

    let recovery = new Recovery({
        max: '30 seconds',
        min: '100 milliseconds',
        retries: 5
    });

//    var uri = 'ws://realtime.nobil.no/api/v1/stream?apikey=6c3675a53310dc503f48f84decd204b6';
    let uri = 'ws://localhost:8080';
    let socket = new ws(uri);

    socket.on('ping', () => {
        console.log('client ping');
    });

    socket.on('open', () => {
        this.emit('connection');
    });

    socket.on('message', (msg) => {
        let obj = {};

        try {
            obj = JSON.parse(msg);
        } catch (error) {
            return this.emit('error', error);
        }

        if (obj.type !== 'snapshot:init') {
            this.emit('message', obj);
            this.push(obj);            
        }
    });

    socket.on('close', () => {
        this.emit('close');
        this.close();
        this.push(null);
    });

    socket.on('error', (error) => {
        if (error.toString() === 'Error: unexpected server response (401)') {
            return this.emit('close', 'unauthorized');
        }
        this.emit('error', error);
    });
};
util.inherits(StreamClient, Readable);



StreamClient.prototype._read = function _read() {
    // nothing needed here
};
