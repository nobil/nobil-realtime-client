"use strict";

const Client = require('../').Stream,
      stream = require('readable-stream'),
      tap = require('tap'),
      ws = require('ws');



tap.test('options object not provided - result should throw assert error', (t) => {
    t.throws(() => {
        let foo = new Client();
    }, new Error('you must pass an options object'));
    t.end();
});


tap.test('key parameter not provided - result should throw assert error', (t) => {
    t.throws(() => {
        let foo = new Client({});
    }, new Error('you must pass an api key on the options object'));
    t.end();
});








/*

const wss = new ws.Server({ port: 8080 });

wss.on('connection', (socket) => {

    let pingThreshold = 2,
        pingFrequency = 1000 * 30;

    socket.pingSent = 0;
    socket.pingInterval = setInterval(() => {
        if (socket.readyState !== 1)
            return;
        if (socket.pingSent >= pingThreshold)
            return socket.close();
        socket.ping();
        socket.pingSent++;
    }, pingFrequency);

    socket.on('pong', () => {
        socket.pingSent = 0;
    });

    socket.on('close', () => {
        clearInterval(socket.pingInterval);
    });

    socket.send(JSON.stringify({foo:'bar'}));
});



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


var cli = new client({key : ''});
cli.on('connection', () => {
    console.log('connect');
});

cli.on('close', (msg) => {
    console.log('close', msg);
});

cli.on('error', (error) => {
    console.log('error', error);
});


cli.pipe(writable);

*/