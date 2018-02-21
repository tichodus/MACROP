var https = require('http');

var localServer = 'localhost';
var localPort = 3000;
var cloudServer = 'https://macrop.herokuapp.com';

function CreatePostOptions(path, data) {

    var options = {
        host: localServer,
        port: localPort,
        path: '/api' + path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(data))
        }
    };

    return options;
};

function CreateDeleteOptions(path, data) {

    var options = {
        host: localServer,
        port: localPort,
        path: '/api' + path,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(data))
        }
    };

    return options;
};

function CreatePutOptions(path, data) {

    var options = {
        host: localServer,
        port: localPort,
        path: '/api' + path,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(data))
        }
    };

    return options;
};

function CreateRequest(options, data, metoda) {

    var req = https.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            // console.log('BODY: ' + chunk);
            metoda(chunk);
        });
        res.on('end', () => {
            //console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.write(JSON.stringify(data));

    return req;
};



exports.postMethod = function PostMethod(path, data, metoda) {

    var options = CreatePostOptions(path, data);

    var req = CreateRequest(options, data, metoda);

    req.end();
};

exports.deleteMethod = function DeleteMehod(path, data, metoda) {

    var options = CreatePostOptions(path, data);

    var req = CreateRequest(options, data, metoda);

    req.end();
};

exports.putMethod = function PutMethod(path, data, metoda) {

    var options = CreatePostOptions(path, data);

    var req = CreateRequest(options, data, metoda);

    req.end();
};