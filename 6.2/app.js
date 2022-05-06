const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');

//multer 미들웨어 에 대한 파트 일단 스킵
/*
try{
    fs.readdirSync('uploads');
}catch(error){
    console.error('uploads 디렉토리가 없어 생성합니다');
    fs.mkdirSync('uplodas');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname.filename(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024},
});
*/
dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); //요청과 응답 콘솔에 기록

app.use('/', express.static(path.join(__dirname, 'public'))); //static 미들웨어 - 정적인 파일을 제공하는 라우터

//body-parser: 본문 데이터를 req.body로 만들어줌
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//해석된 쿠키가 req.cookies 객체에 들어감. 서명된 쿠키가 있으면 비밀키를 통해 해당 서버에서 만든 쿠키인지 검증 가능.
app.use(cookieParser(process.env.COOKIE_SECRET));

//세션 관리용 미들웨어
//인수로 세션에 대한 설정값
app.use(session({
    resave: false,                      //요청이 오면 세션에 수정 사항이 앵기지 않더라도 세션을 다시 저장할 것인지
    saveUninitialized: false,           //세션에 저장할 내역이 없더라도 세션을 생성할 것인가
    secret: process.env.COOKIE_SECRET,  //쿠키 서명에 사용하는 값
    cookie:{                            //세션 쿠키에 대한 설정
        httpOnly: true,                 //클라ㅣ언트에서 쿠키 확인 불가
        secure: false,                  //https 아니어도 사용 가능
    },
    name: 'session-cookie',             
}));

app.use((req,res,next) => {
    console.log('모든 요청에 실행');
    next();
});

app.get('/', (req,res,next) => {
    console.log('GET /요청에 실행');
    next();
}, (req, res) => {
    throw new Error("에러는 에러 처리 미들웨어로")
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});