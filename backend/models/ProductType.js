const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductType = sequelize.define(
  "producttype",
  {
    product_type_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Auto-generate UUID
    },
    product_type_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure product type names are unique
    },
  },
  {
    tableName: "producttype",
    timestamps: false, // Disable createdAt/updatedAt if not needed
  }
);

module.exports = ProductType;
