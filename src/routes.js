import express from 'express';
const router = express.Router();

router.get('/helloworld', (req, res, next) => {
  res.send('hello world');
});

export default router;
