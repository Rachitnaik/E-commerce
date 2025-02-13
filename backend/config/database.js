require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Required for Render
        },
      },
    })
  : new Sequelize(
      process.env.PG_DATABASE, // Local Database name
      process.env.PG_USER, // Local Database user
      process.env.PG_PASSWORD, // Local User password
      {
        host: process.env.PG_HOST, // Local Database host
        port: process.env.PG_PORT, // Local Database port
        dialect: "postgres",
      }
    );

module.exports = sequelize;
