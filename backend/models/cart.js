const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cart = sequelize.define(
  "carttable",
  {
    cart_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Auto-generate UUID if not provided
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "product",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "user_id",
      },
    },
  },
  {
    tableName: "cart",
    timestamps: false, // Disable createdAt/updatedAt if not needed
  }
);

module.exports = Cart;
