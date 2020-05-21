require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve = require("koa-static");
const mount = require("koa-mount");
const mongoose = require('mongoose');

const router = require('./routes/router.js');

const app = new Koa();
const static_pages = new Koa();
static_pages.use(serve(__dirname + '/../../client/build'));
app.use(mount("/", static_pages));


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('connnected to db');
  }
});

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT);
console.log(`Server listening on ${process.env.SERVER_HOST}:${process.env.PORT}`);
