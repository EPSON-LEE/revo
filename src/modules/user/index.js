const Router = require('koa-router');
const UserController = require('@modules/user/user.controller');

const userRouter = new Router();

userRouter.post('/signup', UserController.signup);
userRouter.post('/login', UserController.login);

module.exports = {
  userRouter
}
