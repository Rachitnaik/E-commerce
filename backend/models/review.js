const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Review = sequelize.define(
  "reviewtable",
  {
    review_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Auto-generate UUID if not provided
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: true, // Allow null for optional reviews
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: true, // Allow null if date is not provided
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false, // Rating is required
      validate: {
        min: 1,
        max: 5,
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
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Product",
        key: "product_id",
      },
    },
  },
  {
    tableName: "reviewtable",
    timestamps: false, // Disable createdAt/updatedAt if not needed
  }
);
module.exports = Review;
