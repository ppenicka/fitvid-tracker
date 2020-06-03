const Router = require('@koa/router');

const { sendToGoogle, processGoogleCb } = require('../controllers/login');

const router = new Router();

router
  .get('/google', sendToGoogle)
  .get('/google-cb', processGoogleCb);

module.exports = router;
