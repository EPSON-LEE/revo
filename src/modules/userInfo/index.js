const Router = require('koa-router');
const UserController = require('@modules/userInfo/userInfo.controller');

const userInfoRouter = new Router();

userInfoRouter.post('/createUserInfo/:userId', UserController.createUserInfo);
userInfoRouter.post('/updateUserInfo/:userId', UserController.updateUserInfo);

module.exports = {
  userInfoRouter
}
