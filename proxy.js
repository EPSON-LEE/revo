const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  console.log('ctx 3001', ctx)
  ctx.body = ctx;
});

router.get('/list', (ctx, next) => {
  ctx.body = '我是 3001 list 端口';
});


console.log(`3001 启动`);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);