// @ts-check

// 새폴더 만들었음.
// es린트랑 프리티어랑 타입스크립트 확인할때
// 보통 이렇게 코드써보고 빨간줄 나오는지 보면 된다다.
// var x = 'aaaa';
// console.log('1111');
// Math.log(x);

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
// const userRouter = express.Router(); 라우터 쓰게되면서 쓸모없게되었음
const { PORT } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
// board라고 썼지만 board.js를 불러온다는 의미임
const dataRouter = require('./routes/data');
const dbBoardRouter = require('./routes/dbBoard');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.set('view engine', 'ejs');

app.use(cookieParser('tetz'));
app.use(
  session({
    secret: 'tetz',
    resave: false,
    saveUninitialized: true,
  })
);

// localhost:4000/css
app.use('/css', express.static('views/css'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// localhost:4000 -> views/css/
app.use(express.static('views'));
app.use(express.static('public'));
// static폴더명으로 보통 public이라고 만들어서 많이 쓴다.

// localhost:4000
app.use('/', indexRouter);
// localhost:4000/users
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/board', boardRouter);
app.use('/data', dataRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행중입니다!`);
});
