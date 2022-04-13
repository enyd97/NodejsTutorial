const http = require('http');
const fs = require('fs').promises;

const users = {};

http.createServer(async (req, res) => {
    try{
        console.log(req.method, req.url);
        if(req.method === 'GET'){
            if(req.url === '/'){
                const data = await fs.readFile('./restFront.html');
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/about'){
                const data = await fs.readFile('./about.html');
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/users'){
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch(err){
                //error occur
            }
        }
        else if (req.method === 'POST'){
            if(req.url === '/user'){
                let body = '';
                req.on('data', (data) => {  //end 이벤트에 따른 콜백함수
                    body += data;   //요청의 body를 stream 형식으로 받음 
                });
                //요청의 body를 받은 후 실행
                return req.on('end', ()=>{
                    console.log('POST 본문 :', body);
                    const { name } = JSON.parse(body);
                    const id = Date.now();
                    users[id] = name;
                    res.writeHead(201, {'Content-Type': 'text/plain; charset=utf-8'} );
                    res.end('등록 성공');
                });
            }
        }
        else if(req.method === 'PUT'){
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];  // /를 기준으로 parsing해서 3번째 element(user name or id)를 key에 저장한다? 
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                return req.on('end', () =>{
                    console.log('PUT 본문 :', body);
                    users[key] = JSON.parse(body).name;
                    return res.end(JSON.stringify(users));
                })
            }
        }
        else if(req.method === 'DELETE'){
            if (req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                delete users[key];
                return res.end(JSON.stringify(users));
            }
        }
        res.writeHead(404);
        return res.end('Not found');
    } catch(err){
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
})
.listen(8080, ()=>{
    console.log('8080에서 포트 대기중');
})