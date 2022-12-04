// @ts-check
const express = require('express');

const router = express.Router();

const POSTS = [
  {
    title: 'title01',
    content: '가나다라마바사',
  },
  {
    title: 'title02',
    content: 'abcdefg',
  },
];

// localhost:4000/posts
// posts 서비스 페이지
router.get('/', (req, res) => {
  res.render('posts', { POSTS, postCounts: POSTS.length });
});

// localhost:4000/posts/list
// 전체 포스트 목록 보여주기
router.get('/list', (req, res) => {
  res.send(POSTS);
});

// localhost:4000/posts/
// 새로운 포스트 등록
router.post('/', (req, res) => {
  if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
      };
      POSTS.push(newPost);
      res.redirect('/posts');
    } else {
      const err = new Error('Missing data');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
