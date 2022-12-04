// @ts-check
const express = require('express');

const router = express.Router();

const USER = [
  {
    id: 'kimi',
    name: '이기원',
    email: 'ev@naver.com',
  },
  {
    id: 'tetz',
    name: '이효석',
    email: 'lhs@gmail.com',
  },
];

// EJS 파트
router.get('/', (req, res) => {
  res.render('users', { USER, userCounts: USER.length });
});

// 유저라우터, 전체 회원 목록 조회
router.get('/list', (req, res) => {
  res.send(USER);
});

// 특정 ID를 가진 회원 정보 조회
router.get('/id/:id', (req, res) => {
  const findUser = USER.find((user) => {
    console.log(user);
    return user.id === req.params.id;
  });

  if (findUser) {
    res.send(findUser);
  } else {
    const err = new Error('ID를 찾을 수 없습니다~');
    err.statusCode = 404;
    throw err;
  }
});

// 새로운 회원 등록
router.post('/', (req, res) => {
  console.log(req.query);
  if (Object.keys(req.query).length > 0) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.send('회원 등록 완료!');
    } else {
      const err = new Error('Unexpected Query!');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.id && req.body.name && req.body.email) {
      const newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
      };
      USER.push(newUser);
      res.redirect('/users');
    } else {
      const err = new Error('Unexpected Query!');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

// 동적 웹 그리기
// localhost:4000/users/show
router.get('/show', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
  res.write('<h1>Hello, Dynamic Web page!</h1>');
  for (let i = 0; i < USER.length; i++) {
    res.write(`<h2>USER id is ${USER[i].id}`);
    res.write(`<h2>USER name is ${USER[i].name}`);
    res.write(`<h2>USER email is ${USER[i].email}`);
  }
  res.end('');
});

module.exports = router;
