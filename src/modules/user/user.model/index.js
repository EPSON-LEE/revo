const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('@config/database')
const UserDetail = require('@modules/userInfo/userInfo.model')

const TABLE_NAME = 'user_basic_info';

// 定义模型
const User = sequelize.define(TABLE_NAME, {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    comment: '用户id'
  },
  user_name:{
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true,
    comment: '用户名称'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户密码'
  },
  phone: {
    type: DataTypes.STRING(11),
    allowNull: false,
    comment: '用户手机号码',
  },
  is_cancelled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: '用户是否被注销'
  },
  created_time: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    comment: '用户创建时间'
  },
  updated_time: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    comment: '用户创建时间'
  },
}, {
  timestamps: false,
  freezeTableName: true                           // 禁用自动添加 "s" 后缀
})

UserDetail.belongsTo(User, { foreignKey: 'user_id' })
User.hasOne(UserDetail, { foreignKey: 'user_id' })

// 同步模型到数据库
User.sync({ force: true })
  .then(() => {
    console.log('User 模型已同步');
  })
  .catch((error) => {
    console.error('无法同步 User 模型:', error);
  });


module.exports = User

