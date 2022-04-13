const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello node!</h1>');
    res.end('<p>Hello Server!</p>');
});

server.listen(8080);    //server 리스너

server.on('listening', () => {  //listening 이벤트 리스너
    console.log('8080에서 대기중');
});

server.on('error', (error)=>{   //error 이벤트 리스너
    console.error(error)
});