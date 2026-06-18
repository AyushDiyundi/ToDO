const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo_app', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
