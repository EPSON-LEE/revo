const User = require('@modules/user/user.model')
const UserInfo = require('@modules/userInfo/userInfo.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const secretKey = process.env.DB_KEY;  
const expiredIn = process.env.EXPIRED_IN                                                   // crypto.randomBytes(32).toString('hex')

const signup = async (ctx) => {
  const { username, password, phone  } = ctx.request.body;
  try {
    // 使用 bcrypt 对密码进行哈希处理
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({ user_name: username, password: hashedPassword, phone  });
    const userInfo = await UserInfo.create({ user_id: user.user_id})

    const { user_id, user_name } = user;
    ctx.body = {
      user_id,
      user_name
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.errors };
    console.log('error', error)
  }
}


const login = async (ctx) => {
  const { username,  password } = ctx.request.body;
  const user = await User.findOne({ where: { user_name: username } });
  try {
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);                          // 比较提供的密码与数据库中存储的密码是否匹配
      if (passwordMatch) {
        const token = jwt.sign({ userId: user.user_id }, secretKey, { expiresIn: expiredIn });
        ctx.body = { token };
      } else {
        ctx.status = 401;
        ctx.body = { message: '密码错误' };
      }
    } else {
      ctx.status = 401;
      ctx.body = { message: '用户不存在' };
    }
  } catch(err) {
    ctx.status = 500;
    ctx.body = { message: '服务器错误' };
  }
}


module.exports = {
  login,
  signup
};