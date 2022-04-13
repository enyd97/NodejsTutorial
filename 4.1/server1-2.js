const http = require('http');

//다른 포트에 서버 여러개 생성도 가능은 함.

http.createServer((req, res) => {
    //res : 요청에 대한 response 객체
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello node!</h1>');
    res.end('<p>Hello Server!</p>');
})
.listen(8080, ()=>{ //createServer 메서드에 listen 메서드를 붙이고 listen 메서드에 콜백함수 추가.
    console.log('8080번 포트에서 서버 대기 중입니다!');
});

http.createServer((req, res) => {
    //res : 요청에 대한 response 객체
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello node!</h1>');
    res.end('<p>Hello Server!</p>');
})
.listen(8081, ()=>{ //createServer 메서드에 listen 메서드를 붙이고 listen 메서드에 콜백함수 추가.
    console.log('8081번 포트에서 서버 대기 중입니다!');
});