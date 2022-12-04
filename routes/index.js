// @ts-check
const express = require('express');

const router = express.Router();

// EJS 파트
// localhost:4000/users/ejs

router.get('/', (req, res) => {
  res.render('index', { popup: req.cookies.popup });
});

router.post('/cookie', (req, res) => {
  res.cookie('popup', 'hide', {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send('쿠키 생성 성공');
});

router.get('/', (req, res) => {
  res.cookie('alert', true, {
    expires: new Date(Date.now() + 1000 * 10),
    httpOnly: true,
  });

  console.log(req.cookies.alert);
  console.log(req.cookies.tetz);

  res.render('index', { alert: req.cookies.alert });
});

module.exports = router;
