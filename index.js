const http = require('http');
const https = require('https');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const config = require('./config');
const fs = require('fs');

// instantiate http server
const httpServer = http.createServer((req,res) => {
    unifiedServer(req, res)
});

// instantiate https server
const httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsServerOptions,(req,res) => {
    unifiedServer(req, res)
});

const handlers = {};
handlers.ping = (data, callback) => {
    callback(200)
};
handlers.notFound = (data, callback) => callback(404);
const router = {
    'sample': handlers.ping
};

// Server logic for https and http
const unifiedServer = (req, res) => {
    const parsedUrl = url.parse(req.url,  true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headers = req.headers;

    // Get the payload if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data)
    });

    req.on('end', () => {
        buffer += decoder.end();

        const chosenHandler = typeof(router[trimmedPath]) !== "undefined" ? router[trimmedPath] : handlers.notFound;
        // send data to the handler
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        chosenHandler(data, (statusCode, payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
            payload = typeof(payload) === 'object' ? payload : {};
            const payloadToString = JSON.stringify(payload);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadToString);
            console.log(`Returning this response: ,
             ${statusCode}, 
             ${payloadToString}
             `)
        });
    });
};

httpServer.listen(config.HTTP_PORT,() => {
    console.log(`Server Listening on port ${config.HTTP_PORT} in ${config.ENV_NAME}` )
});

httpsServer.listen(config.HTTPS_PORT,() => {
    console.log(`Server Listening on port ${config.HTTPS_PORT} in ${config.ENV_NAME}` )
});





