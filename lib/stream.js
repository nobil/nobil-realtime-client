"use strict";

const Readable = require('readable-stream').Readable,
      assert = require('assert'),
      util = require('util'),
      url = require('url'),
      ws = require('ws');



const StreamClient = module.exports = function StreamClient (options) {
    var self = this;

    Readable.call(this, {objectMode : true});
    // this.socket = new ws(url.format(options.url));

    var uri = 'ws://realtime.nobil.no/api/v1/stream?apikey=';
    var socket = new ws(uri);

    socket.on('open', () => {
        this.emit.call(self, 'connect');
    });

    socket.on('message', (msg) => {
        var obj = {};

        try {
            obj = JSON.parse(msg);
        } catch (error) {
            this.emit.call('error', 'could not parse incomming JSON', error);
            return;
        }

        if (obj.type === 'status:update') {
            this.emit.call('message', obj, 'charger with uuid: ' + obj.data.uuid);

        } else if (obj.type === 'status:raw') {
            this.emit.call('raw', obj, 'charger with uuid: ' + obj.data.uuid);
        }
//console.log(obj);
        self.push(obj);
    });

    socket.on('close', () => {
        this.emit.call(self, 'close', null);
        this.close();
        this.push(null);
    });

    socket.on('error', (error) => {
        this.emit.call(self, 'error', error);
    });
};
util.inherits(StreamClient, Readable);



StreamClient.prototype._read = function _read() {
    // nothing needed here
};
