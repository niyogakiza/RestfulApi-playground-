const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {
    const parsedUrl = url.parse(req.url,  true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    res.end('I am a server\n');
    console.log(`Request received on path: ${trimmedPath}` )
});



server.listen(3000,() => {
    console.log('I')
});






