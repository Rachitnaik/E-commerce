const { Sequelize } = require("sequelize");
const config = require("./config.json"); // Path to the config.json file

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: config.development.port,
    dialect: config.development.dialect,
    dialectOptions: config.development.dialectOptions,
  }
);

module.exports = sequelize; // Export the connection
