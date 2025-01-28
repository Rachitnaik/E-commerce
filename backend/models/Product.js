const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
  "Product",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    features: {
      type: DataTypes.JSONB,
      allowNull: true, // Allow null if features are optional
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "category", // Table name of the Category model
        key: "category_id", // Column name in the Category model
      },
    },
    product_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "product_type", // Table name of the ProductType model
        key: "product_type_id", // Column name in the ProductType model
      },
    },
  },
  {
    tableName: "product",
    timestamps: false, // Disable createdAt/updatedAt if not needed
  }
);

module.exports = Product;
