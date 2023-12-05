const jwt = require('jsonwebtoken');


const authPlugin = (options) => {
  return async (ctx, next) => {
    const token = ctx?.headers?.authorization;

    if (options?.exclude && options?.exclude?.includes(ctx.path)) {
      await next()
      return;
    }

    if (!token) {
      ctx.status = 401;
      ctx.body = 'Unauthorized';
      return;
    }

    try {
      const decoded = jwt.verify(token, options?.secret);                // 验证令牌
      ctx.state.user = decoded;                                         // 将解码后的用户信息存储在上下文中，以便后续中间件和路由处理程序使用
      await next();
    } catch (err) {
      ctx.status = 401;
      ctx.body = 'Unauthorized';
      console.log('err', err)
    }
  }
}

module.exports = authPlugin;
