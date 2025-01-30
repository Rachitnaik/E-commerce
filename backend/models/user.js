const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "usertable",
  {
    user_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Auto-generate UUID if not provided
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "usertable",
    timestamps: false, // Disable createdAt/updatedAt if not needed
  }
);

module.exports = User;
