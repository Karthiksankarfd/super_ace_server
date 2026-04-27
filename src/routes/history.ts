import express from 'express';
const router = express.Router();

router.get('/history', (req, res) => {
  res.send('User list');
});

export default router;