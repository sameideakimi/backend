// @ts-check

const express = require('express');

const silseup = express();
const userRouter = express.Router();
const PORT = 4000;

silseup.set('view engine', 'ejs');

const USER = [
  {
    id: 'kimi',
    name: '이기원',
    email: 'ev@gmail.com',
  },
  {
    id: 'tetz',
    name: '이효석',
    email: 'lhs@naver.com',
  },
];

// 유저라우터, 전체 회원 목록 조회
userRouter.get('/', (req, res) => {
  res.send(USER);
});

// 새로운 회원 등록
userRouter.post('/', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
      email: req.query.email,
    };
    USER.push(newUser);
    res.send('회원 등록 완료!');
  } else {
    res.send('정확한 쿼리를 입력해주세요 Unexpected Query!');
  }
});

// 회원 수정을 하는 API
userRouter.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
    if (findUserIndex !== -1) {
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[findUserIndex] = modifyUser;
      res.send('회원정보 수정완료!');
    } else {
      res.send('ID를 찾을 수 없습니다!');
    }
  } else {
    console.log('Unexpected Query!');
  }
});

// 회원삭제 하는 API
userRouter.delete('/:id', (req, res) => {
  const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
  if (findUserIndex !== -1) {
    USER.splice(findUserIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    res.send('해당 ID를 찾을 수 없습니다!');
  }
});

silseup.use('/users', userRouter);

silseup.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행중입니다!`);
});
