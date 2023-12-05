const User = require('@modules/user/user.model');
const UserDetail = require('@modules/userInfo/userInfo.model')


const createUserInfo = async (ctx) => {
  const { gender, age, email } = ctx.request.body;
  const { userId } = ctx.params;
  console.log('userId', userId)
  try {
    const userInfo = await UserDetail.create({  user_id: userId, gender, age, email  });
    ctx.body = userInfo;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
    console.log('error', error)
  }
}


const updateUserInfo = async (ctx) => {
  const { gender, age, email } = ctx.request.body;
  const { userId } = ctx.params;
  try {

    const user = await User.findOne({ where: { user_id: userId } });
    if (user) {
      const [updatedRows] = await UserDetail.update(
        { age, email, gender },
        { where: { user_id: userId } }
      )
      ctx.body = await UserDetail.findOne({ where: { user_id: userId } });
    } else {
      ctx.status = 400
      ctx.body = '此用户不存在';
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
    console.log('error', error)
  }
}


const modifyUserInfo = async (ctx) => {

  const { id } = ctx.params;
  const {  username, gender, age, email, token } =  ctx.request.body

  try {
    const user = await User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      ctx.body = 'User not found';
      return;
    }
    user.age = age;
    user.username = username;
    user.email = email;
    user.gender = gender;
    await user.save();
    ctx.body = user;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { 
      msg: error
      //  `${error?.name}: ${error?.sql}`
     };
    console.log('error', error)
  }
}


module.exports = {
  createUserInfo,
  updateUserInfo
};