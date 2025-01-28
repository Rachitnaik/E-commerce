const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Auto-generate UUID
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure category names are unique
    },
  },
  {
    tableName: "category",
    timestamps: false, // Disable createdAt/updatedAt if not needed
  }
);

module.exports = Category;
