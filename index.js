const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const server = http.createServer((req,res) => {
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
            res.writeHead(statusCode);
            res.end(payloadToString);
            console.log(`Returning this response: ,
             ${statusCode}, 
             ${payloadToString}
             `)
        });
    });
});

const handlers = {};
handlers.sample = (data, callback) => callback(406, { 'name': 'Sample handler'});
handlers.notFound = (data, callback) => callback(404);
const router = {
    'sample': handlers.sample
};

server.listen(3000,() => {
    console.log('Server Listening on port 3000')
});





