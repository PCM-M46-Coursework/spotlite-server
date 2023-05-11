const { Sequelize } = require("sequelize");

const connection = new Sequelize(process.env.MYSQL_URL);

connection.authenticate();

console.log("DB connection is working");

module.exports = connection;
