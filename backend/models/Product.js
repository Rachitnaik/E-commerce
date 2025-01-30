const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
  "product",
  {
    product_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Auto-generate UUID if not provided
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
        model: "category",
        key: "category_id",
      },
    },
    product_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "producttype",
        key: "product_type_id",
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // Allow null for optional pricing
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "product",
    timestamps: false,
  }
);

module.exports = Product;
