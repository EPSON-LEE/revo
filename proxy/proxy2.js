const Koa = require('koa');
const send = require('koa-send');
const cors = require('koa2-cors');
const mount = require('koa-mount');
const proxy = require('koa-proxy');
const jwt = require('jsonwebtoken');
const static = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

// 设置静态目录
const staticPath = __dirname + '/public'
const staticMiddleware = static(staticPath)

// 密钥，用于签发和验证 JWT
const secretKey = 'your-secret-key';

router.post('/login', async (ctx) => {
  // 假设这里是用户登录验证的逻辑,验证成功后，生成 JWT 并返回给客户端
  const user = { id: 1, username: 'example' };
  // 生成 JWT
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
  ctx.body = { token };
});

router.get('/', (ctx, next) => {
  console.log(`3000 index 启动`, ctx);
  ctx.body = '3000 - / 启动';
});


router.get('/list', (ctx, next) => {
  console.log(`3000 list 启动`);
  ctx.body = '3000 list 启动';
});

console.log(`3000 启动`);

app
  .use(proxy({
    host: 'http://localhost:3001/', // 转发目标服务器的地址
    match: /^\// // 匹配需要转发的接口路径
    // match: '*'
  }))
  .use(cors())
  .use(bodyParser())
  .use(mount('/index', staticMiddleware))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000);