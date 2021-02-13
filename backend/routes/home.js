import express from 'express';
const router = express.Router({ mergeParams: true });

/* GET home page. */
router.get('/', function (req, res) {
  res.send('<h1>API is running...</h1>');
});

export default router;
