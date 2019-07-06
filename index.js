const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {
    const parsedUrl = url.parse(req.url,  true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    res.end('I am a server\n');
    console.log(`Request received on path: ${trimmedPath} \n with this method :  ${method} \n and the query : ${JSON.stringify(queryStringObject)}` )
});

server.listen(3000,() => {
    console.log('Server Listening on port 3000')
});





