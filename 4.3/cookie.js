const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookie': 'mycookie=test'});//브라우저에 쿠키를 저장
    res.end('Hello Cookie');
})
.listen(8080, () =>{
    console.log('8080 포트가 대기중입니다')
});