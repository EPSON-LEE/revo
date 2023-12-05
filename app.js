require('./alias')
require('dotenv').config();                                                               // 加载环境变量
const Koa = require('koa');
const crypto = require('crypto');
const send = require('koa-send');
const cors = require('koa2-cors');
const mount = require('koa-mount');
const proxy = require('koa-proxy');
const static = require('koa-static');
const Router = require('koa-router');
const compose = require('koa-compose');
const bodyParser = require('koa-bodyparser');
const combineRouters = require('koa-combine-routers')
const authPlugin = require('@utils/authPlugin');
const { sequelize } = require('@config/database')
const router = require('@src/index')

const app = new Koa();
const indexRouter = new Router();

const secretKey = process.env.DB_KEY;                                                     // crypto.randomBytes(32).toString('hex')

const staticMiddleware = static(__dirname + '/public' )                                   // 设置静态目录

indexRouter.get('/health', (ctx, next) => {
  ctx.body = '8080 -> index 启动';
});

app
  .use(authPlugin({
    secret: secretKey,
    exclude: ['/login','/health','/signup'] // 排除的路由
  }))
  .use(cors())
  .use(bodyParser())
  .use(mount('/index', staticMiddleware))
  .use(router())


  sequelize.sync().then(() => {
    // 启动服务器
    app.listen(8080, () => {
      console.log('Server is running on port 3000');
    });
  });