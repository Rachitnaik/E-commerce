const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Feedback = sequelize.define(
  "feedbacktable",
  {
    feedback_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Auto-generate UUID if not provided
    },
    feedback_text: {
      type: DataTypes.TEXT,
      allowNull: true, // Allow null for optional feedback
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true, // Rating is optional
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
    date: {
      type: DataTypes.DATE,
      allowNull: true, // Allow null if date is not provided
    },
  },
  {
    tableName: "feedback",
    timestamps: false, // Disable createdAt/updatedAt if not needed
  }
);

module.exports = Feedback;
