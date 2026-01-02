const { Sequelize } = require('sequelize');
const path = require('path');

// Load .env RÕ RÀNG từ thư mục root của project
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

// console.log('DB_USER =', process.env.DB_USER);
// console.log('DB_NAME =', process.env.DB_NAME);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
