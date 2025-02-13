require("dotenv").config(); // Load .env variables
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.PG_DATABASE, // Database name
  process.env.PG_USER, // Database user
  process.env.PG_PASSWORD, // User password
  {
    host: process.env.PG_HOST, // Host address
    port: process.env.PG_PORT, // Database port
    dialect: "postgres", // Using PostgreSQL
  }
);

module.exports = sequelize; // Export the connection
