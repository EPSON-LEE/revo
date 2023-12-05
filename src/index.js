const {userRouter}  = require('@modules/user')
const {userInfoRouter}  = require('@modules/userInfo')
const combineRouters = require('koa-combine-routers')


module.exports = combineRouters(
    userRouter,
    userInfoRouter
)