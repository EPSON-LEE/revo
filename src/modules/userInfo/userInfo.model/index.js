const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('@config/database')
const User  = require('@modules/user/user.model')

const TABLE_NAME = 'user_detail';
// 定义模型
const UserDetail = sequelize.define(TABLE_NAME, {
  user_detail_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  gender: {
    type: Sequelize.TINYINT,
    allowNull: true,
    defaultValue: 1,
  },
  age: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: true,
    defaultValue: 18,
    validate: {
      min: 0,
      max: 100,
    },
  },
  email: {
    type: DataTypes.STRING(70),
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  created_time: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_time: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false,
  freezeTableName: true                           // 禁用自动添加 "s" 后缀
})

// UserDetail.belongsTo(User)

// 同步模型到数据库
sequelize.sync()
  .then(() => {
    console.log('user_detail 模型已同步');
  })
  .catch((error) => {
    console.error('无法同步 user_detail 模型:', error);
  });


module.exports = UserDetail

