const fs = require('fs');
const Sequelize = require('sequelize')
const caCert = fs.readFileSync('/etc/ssl/cert.pem');                         

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_TIMEZONE } =  process.env

const sequelize = new Sequelize('', DB_USER, DB_PASSWORD, {                // 创建导出 Sequelize 实例模型和 Sequlize 实例
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: 'test',
  dialect: 'mysql',
  timezone: DB_TIMEZONE,                                                    // 设置时区为 UTC
  dialectOptions: {
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
      ca: caCert
    },
  }
});

module.exports = { sequelize }

